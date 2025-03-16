"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import GovtOrgSelector from "@/components/govt-org-selector";
import Title from "@/components/title";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import Footer from "@/components/footer";

export default function DashboardPage() {
  const { t } = useI18n();
  return (
    <>
      <Nav />
      <main>
        <section id="find-a-dashboard">
          <div className="bg-white shadow-md rounded-lg py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center px-4">
                <div className="hidden md:block mx-auto">
                  <Image
                    src="/facilities-finder.svg"
                    alt="Kerala Map"
                    width={252}
                    height={452}
                    className="w-full max-w-[252px]"
                  />
                </div>
                <div className="space-y-6 truncate">
                  <Title className="text-wrap">{t("dashboard.title")}</Title>
                  <p className="text-gray-600 text-wrap">{t("dashboard.description")}</p>
                  <GovtOrgSelector
                    showState={true}
                    trigger={(org) => (
                      <Button asChild>
                        <Link
                          href={`${
                            process.env.NEXT_PUBLIC_GOV_DASHBOARD_URL
                          }/?id=${
                            org?.id || "1522e452-9907-47da-b62a-07c4bf78dff8"
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          {t("dashboard.form.submit")}
                        </Link>
                      </Button>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
