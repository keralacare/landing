"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Nav() {
  const { t, language, setLanguage } = useI18n();
  const [shrinked, setShrinked] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const navRef = React.useRef<HTMLElement>(null);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY.current) {
        setShrinked(currentScrollY > 150);
        setMobileMenuOpen(false);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.findFacility"), href: "/#find-a-facility" },
    { label: t("nav.about"), href: "/#about-palliative-care" },
    {
      label: t("nav.gridLogin"),
      href: `${process.env.NEXT_PUBLIC_GRID_URL}/login`,
    },
  ];

  return (
    <nav
      ref={navRef}
      className={cn(
        "sticky top-0 z-[100] text-white transition-all duration-1000 ease-in-out px-4",
        shrinked || pathname !== "/" || mobileMenuOpen
          ? "py-2 bg-gradient-to-r from-[#057252] to-[#059669] backdrop-blur-none shadow-xl"
          : "py-4 bg-transparent backdrop-blur-[2px] shadow-none"
      )}
    >
      {(shrinked || mobileMenuOpen) && (
        <div
          className="absolute inset-0 opacity-[0.6] bg-[url('/grid-white.png')] bg-repeat bg-contain bg-center -z-10"
          aria-hidden="true"
        />
      )}
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/keralacare-banner-logo.svg"
            alt="Kerala Care Logo"
            width={168}
            height={46}
            className={cn("transition-all", shrinked && "scale-90")}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hover:text-primary-100 hover:underline hover:underline-offset-4 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button
            variant="link"
            className="text-white hover:text-primary-100 text-base"
            onClick={() => setLanguage(language === "en" ? "ml" : "en")}
          >
            {language === "en" ? "മലയാളം" : "English"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:text-primary focus:bg-transparent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full right-0 lg:hidden">
          <div className="py-4 bg-white text-gray-600 text-sm rounded-b-md">
            <div className="flex flex-col items-end">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:text-primary transition-colors w-full text-end px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  variant="link"
                  className="text-primary transition-colors w-full "
                  onClick={() => {
                    setLanguage(language === "en" ? "ml" : "en");
                    setMobileMenuOpen(false);
                  }}
                >
                  {language === "en" ? "മലയാളം" : "English"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
