import "dotenv/config";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const dir = path.join(__dirname, "../public/organizations");

type OrganizationParent =
  | {
      id: string;
      name: string;
      parent: OrganizationParent;
      metadata: {
        country: string;
        govt_org_type: string;
        govt_org_children_type: string;
      };
      org_type: string;
      level_cache: number;
      cache_expiry: string;
    }
  | Record<string, never>;

type Organization = {
  id: string;
  active: boolean;
  org_type: string;
  name: string;
  metadata: {
    country: string;
    govt_org_type: string;
    govt_org_children_type: string;
  };
  level_cache: number;
  system_generated: boolean;
  has_children: boolean;
  parent: OrganizationParent;
};

type OrganizationsApiResponse = {
  count: number;
  results: Organization[];
};

const fetchOrganizations = async (parent?: Organization) => {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const url = new URL(process.env.CARE_API_URL!);
      url.pathname = "/api/v1/govt/organization/";

      url.searchParams.set("limit", "1000");
      if (parent) {
        url.searchParams.set("parent", parent.id);
      } else {
        url.searchParams.set("level_cache", "1");
      }

      if (parent) {
        console.debug(`Fetching children of ${parent.name}`);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(
          `Failed to fetch organizations from ${url.toString()}: ${
            response.statusText
          } ${response.status}`
        );
      }

      const data: OrganizationsApiResponse = await response.json();
      return data.results;
    } catch (error) {
      attempt++;
      if (attempt === maxRetries) {
        throw error;
      }
      // Exponential backoff with random jitter
      const backoffMs = Math.random() * (1000 * Math.pow(2, attempt));
      console.warn(
        `Attempt ${attempt} failed, retrying in ${Math.round(backoffMs)}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
    }
  }
  throw new Error("Should not reach here");
};

type CacheOutput = {
  id: string;
  name: string;
  has_children: boolean;
  type: string;
  children_type: string;
}[];

const caches: Record<string, CacheOutput> = {};

/**
 * This script reads the organizations from CARE's APIs and creates a cache
 * sharded by parent organization that can be accessed by
 * `{{url}}/organizations/{parent_id}.json`
 *
 * To generate the cache, run `npm run build:org-cache`.
 */
async function main() {
  await mkdir(dir, { recursive: true });

  const rootOrganizations = await fetchOrganizations();
  caches["index"] = buildCache(rootOrganizations);

  await Promise.all(
    rootOrganizations
      .filter((o) => o.has_children)
      .map((o) => fetchOrganizationsRecursive(o))
  );

  // Write all caches to files
  await Promise.all(
    Object.entries(caches).map(([key, cache]) =>
      writeFile(path.join(dir, `${key}.json`), JSON.stringify(cache))
    )
  );
}

main();

const buildCache = (orgs: Organization[]): CacheOutput => {
  return orgs
    .filter((org) => org.active)
    .map((org) => ({
      id: org.id,
      name: org.name,
      has_children: org.has_children,
      type: org.metadata?.govt_org_type,
      children_type: org.metadata?.govt_org_children_type,
    }));
};

const fetchOrganizationsRecursive = async (parent: Organization) => {
  const children = await fetchOrganizations(parent);
  caches[parent.id] = buildCache(children);

  await Promise.all(
    children
      .filter((c) => c.has_children)
      .map((c) => fetchOrganizationsRecursive(c))
  );
};
