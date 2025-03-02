"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";

export default function Footer() {
  const { t } = useI18n();

  const resources = t("footer.resources");

  return (
    <footer className="bg-gradient-to-r from-[#057252] to-[#059669] text-white py-8 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Image
              src="/kerala-dark_state_logo.png"
              alt="Kerala Care Logo"
              width={150}
              height={150}
              className="mx-auto md:mx-0 mb-4 md:mb-0 p-2 invert"
            />
            {resources.map((link) => (
              <a
                href={link.link}
                key={link.label}
                className="text-sm text-green-200 hover:text-green-100 transition-all duration-200 ease-in-out hover:underline hover:underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
            <Image
              src="/keralacare-banner-logo.svg"
              alt="Kerala Care Logo"
              width={168}
              height={46}
              className="mb-4 md:mb-0"
            />
            <div className="text-sm text-gray-50 mt-4 md:mt-6 max-w-sm md:max-w-md">
              <div
                dangerouslySetInnerHTML={{
                  __html: t("footer.text"),
                }}
              />
            </div>
            <div className="text-sm text-gray-50 mt-4 md:mt-6 font-semibold">
              {t("footer.developedBy")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
