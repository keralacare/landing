import path from "path";
import organizationsDump from "../care_public_emr_organization.json";
import { mkdir, writeFile } from "fs/promises";

const dir = path.join(__dirname, "../public/organizations");
const allOrganizations = organizationsDump as Organizations;

type OrganizationParent =
  | Record<string, never>
  | {
      id: string;
      name: string;
      parent: OrganizationParent;
      metadata: { govt_org_type: string };
    };

type Organizations = {
  external_id: string;
  name: string;
  metadata: { govt_org_type: string };
  has_children: boolean;
  cached_parent_json: OrganizationParent;
}[];

type OutputCache = {
  id: string;
  name: string;
  has_children: boolean;
  type: string;
}[];

/**
 * This script reads the organizations DB dump and creates a cache that can
 * be accessed by `{{url}}/organizations/{parent_id}.json`
 *
 * To generate the cache, run `npm run build:org-cache`.
 * To get the org's dump, run the following SQL query:
 *
 * ```sql
 * SELECT external_id, name, metadata, has_children, cached_parent_json FROM emr_organization WHERE org_type = 'govt' AND active = true AND deleted = false;
 * ```
 */
async function main() {
  await mkdir(dir, { recursive: true });

  const groupedByParentId = Object.groupBy(
    // filtering because root org has no parent (such as Kerala)
    allOrganizations.filter((org) => org.cached_parent_json.id),
    (org) => org.cached_parent_json.id
  );

  for (const parentId in groupedByParentId) {
    const children = groupedByParentId[parentId];
    if (children) {
      console.log(
        `Generating cache for '${children[0].cached_parent_json.name}'`
      );
      await writeChildren(parentId, children);
    }
  }
}

main();

const writeChildren = async (parentId: string, children: Organizations) => {
  const isRoot = children.every((o) => o.metadata.govt_org_type === "district");
  const fileName = isRoot ? "districts" : parentId;

  const cacheJson = JSON.stringify(buildCache(children));
  await writeFile(path.join(dir, `${fileName}.json`), cacheJson);
};

const buildCache = (orgs: Organizations): OutputCache => {
  return orgs.map((org) => ({
    id: org.external_id,
    name: org.name,
    has_children: org.has_children,
    type: org.metadata?.govt_org_type,
  }));
};
