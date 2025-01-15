"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Organization = {
  id: string;
  name: string;
  has_children: boolean;
  type: string;
};

const getChildren = async (parentId: string) => {
  const res = await fetch(`/organizations/${parentId}.json`);
  return res.json() as Promise<Organization[]>;
};

export default function GovtOrgSelector() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [selectedOrgs, setSelectedOrgs] = useState<Organization[]>([]);
  const [results, setResults] = useState<Organization[]>([]);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    const fetchChildren = async () => {
      const parentId =
        selectedOrgs.length === 0
          ? "districts"
          : selectedOrgs[selectedOrgs.length - 1].id;
      const res = await getChildren(parentId);
      setResults(res);
    };

    fetchChildren();
  }, [selectedOrgs]);

  return (
    <form className="space-y-4">
      <div className="flex flex-col gap-2">
        {selectedOrgs.map((org, index) => (
          <Input
            key={org.id}
            value={org.name}
            onChange={(e) => {
              setSelectedOrgs(selectedOrgs.filter((_, i) => i < index));
              setSearch(e.target.value);
              setShowPopover(true);
            }}
          />
        ))}

        {(selectedOrgs.length === 0 ||
          selectedOrgs[selectedOrgs.length - 1].has_children) && (
          <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox">
                <span className="truncate text-left w-full text-gray-500">
                  Select{" "}
                  {[...new Set(results.map((r) => r.type))]
                    .join("/")
                    .replaceAll("_", " ")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search"
                  className="outline-none border-none ring-0 shadow-none"
                  value={search}
                  onValueChange={setSearch}
                />
                <CommandList>
                  <CommandEmpty>No results found</CommandEmpty>
                  <CommandGroup>
                    {results.map((org) => (
                      <CommandItem
                        key={org.id}
                        value={org.name}
                        onSelect={() => {
                          setSelectedOrgs([...selectedOrgs, org]);
                          setShowPopover(false);
                        }}
                      >
                        <span>{org.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <Button disabled={selectedOrgs.length === 0} asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_GRID_URL}/facilities?organization=${
            selectedOrgs[selectedOrgs.length - 1]?.id ?? ""
          }`}
        >
          {t("facilities.form.continue")}
        </Link>
      </Button>
    </form>
  );
}
