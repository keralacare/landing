"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import Title from "@/components/title";
import Icons from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import GovtOrgSelector from "@/components/govt-org-selector";
import { Nav } from "@/components/Nav";
import Footer from "@/components/footer";

export default function Page() {
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <main className="pb-24">
        <div className="relative h-[90vh] lg:min-h-screen -mt-40 -z-10">
          <div
            className="absolute inset-0 bg-[url('/cover-image.png')] bg-cover bg-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative z-10 text-white drop-shadow-2xl h-[90vh] lg:min-h-screen flex items-center">
            <div className="container mx-auto px-4 pt-[92px] space-y-12">
              <h1 className="text-5xl md:text-8xl font-bold max-w-4xl mx-auto text-center">
                {t("hero.title")}
              </h1>
              <h2 className="text-3xl md:text-5xl max-w-4xl mx-auto text-center">
                {t("hero.description")}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col pt-20 -mt-40 container mx-auto px-4 max-w-6xl">
          {/* About */}
          <section id="about">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="p-4 md:p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-6 flex-grow">
                <Image
                  src="/about-kerala-care.png"
                  alt="Palliative Care"
                  width={300}
                  height={300}
                  className="w-full h-full md:h-64 md:w-auto rounded-lg size-64"
                />
                <div className="space-y-4 px-6 md:px-0">
                  <h2 className="text-2xl font-bold text-primary-800">
                    {t("about.title")}
                  </h2>
                  <p className="text-gray-600 text-base text-left">
                    {t("about.description")}
                  </p>
                </div>
              </div>

              {/* Grid registration */}
              <div className="w-full lg:max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text font-semibold text-primary-700">
                  {t("about.gridRegistration")}
                </h2>
                <Separator className="my-4" />
                <div className="space-y-6">
                  <Button
                    variant="default"
                    className="w-full bg-primary-600 hover:bg-primary-700 md:text-lg font-bold"
                    asChild
                  >
                    <a href="#find-a-facility">{t("about.buttons.register")}</a>
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-primary-600 hover:bg-primary-700 md:text-lg font-bold"
                    asChild
                  >
                    <a
                      href="https://sannadhasena.kerala.gov.in/volunteerregistration"
                      target="_blank"
                    >
                      {t("about.buttons.volunteer")}
                    </a>
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-primary-600 hover:bg-primary-700 md:text-lg font-bold"
                    asChild
                  >
                    <a href="https://sannadhasena.kerala.gov.in/ngocbo">
                      {t("about.buttons.ngo")}
                    </a>
                  </Button>
                  <div className="text-center">
                    <a
                      href={`${process.env.NEXT_PUBLIC_GRID_URL}/login`}
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      {t("about.buttons.login")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Legacy of compassion */}
          <section id="legacy-of-compassion" className="pt-40">
            <div className="bg-white shadow-md rounded-lg">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-y-8 px-4">
                    <div className="w-full md:w-1/3">
                      <Image
                        src="/cm-portrait.png"
                        alt="Chief Minister"
                        width={346}
                        height={368}
                        className="-mt-16"
                      />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4 md:pr-10">
                      <Title>{t("legacy.title")}</Title>
                      <blockquote className="text-gray-600 leading-relaxed md:pr-16">
                        &ldquo;{t("legacy.quote")}&rdquo;
                      </blockquote>
                      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <cite className="text-primary-800 font-semibold text-lg text-center md:text-left">
                          {t("legacy.author")}
                        </cite>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section id="stats" className="pt-24">
            <div className="bg-white rounded-lg shadow-md py-12 px-6">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  {[
                    { number: "2,000+", label: t("stats.homeCareUnits") },
                    { number: "1,50,000+", label: t("stats.bedBoundPeople") },
                    {
                      number: "4,00,000+",
                      label: t("stats.peopleWithSeriousHealthSufferings"),
                    },
                    { number: "1,00,000+", label: t("stats.volunteers") },
                  ].map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="text-4xl font-black text-zinc-800">
                        {stat.number}
                      </div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="pt-24">
            <div className="bg-white shadow-md rounded-lg py-16">
              <div className="container mx-auto px-4">
                <Title className="text-center mb-12">
                  {t("services.title")}
                </Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-16">
                  {[
                    {
                      icon: Icons.NursesHomeCare,
                      label: t("services.items.nurses"),
                    },
                    {
                      icon: Icons.DoctorsHomeCare,
                      label: t("services.items.doctors"),
                    },
                    {
                      icon: Icons.OutPatientFacility,
                      label: t("services.items.outPatient"),
                    },
                    {
                      icon: Icons.MedicalSupport,
                      label: t("services.items.medical"),
                    },
                    {
                      icon: Icons.ComfortDevices,
                      label: t("services.items.comfort"),
                    },
                    {
                      icon: Icons.VolunteerSupport,
                      label: t("services.items.volunteer"),
                    },
                    {
                      icon: Icons.InPatientFacility,
                      label: t("services.items.inPatient"),
                    },
                    {
                      icon: Icons.CareHomes,
                      label: t("services.items.careHomes"),
                    },
                    {
                      icon: Icons.DomiciliaryNursingCare,
                      label: t("services.items.domiciliaryNursingCare"),
                    },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-4"
                    >
                      {service.icon}
                      <div className="w-32 text-left">{service.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Find a facility */}
          <section id="find-a-facility" className="pt-24">
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
                  <div className="space-y-6">
                    <Title>{t("facilities.title")}</Title>
                    <p className="text-gray-600">
                      {t("facilities.description")}
                    </p>
                    <GovtOrgSelector />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About palliative care */}
          <section id="about-palliative-care" className="pt-24">
            <div className="bg-white rounded-lg shadow-md py-16">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 px-4">
                  <div className="mx-auto w-full">
                    <Image
                      src="/about-palliative-care.png"
                      alt="Palliative Care"
                      width={600}
                      height={600}
                      className="rounded-lg w-full"
                    />
                  </div>
                  <div className="space-y-6">
                    <Title>{t("palliativeCare.title")}</Title>
                    <Accordion type="single" collapsible defaultValue="item-0">
                      {t("palliativeCare.questions").map(
                        ({ question, answer }, index: number) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{question}</AccordionTrigger>
                            <AccordionContent>{answer}</AccordionContent>
                          </AccordionItem>
                        )
                      )}
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
