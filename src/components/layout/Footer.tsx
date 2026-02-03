import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import brwLogo from "@/images/general/logo_short_white_font.svg";

export interface FooterLinks {
  name: string;
  slug: string;
  bold?: boolean;
  addMargin?: boolean;
}

interface LinkSection {
  heading: string;
  links: FooterLinks[];
}

const GeneralLinks: { sections: LinkSection[] }[] = [
  {
    sections: [
      {
        heading: "Immobilienpreise",
        links: [
          { name: "Immobilienpreise Deutschland", slug: "/" },
          { name: "Immobilienpreise NRW", slug: "/nrw" },
        ],
      },
    ],
  },

  {
    sections: [
      {
        heading: "Bodenrichtwerte",
        links: [
          {
            name: "Bodenrichtwerte Deutschland",
            slug: "https://www.bodenrichtwerte-deutschland.de/",
          },
        ],
      },
    ],
  },
];

export default function Footer({ classname }: { classname?: string }) {
  return (
    <footer className={`${classname ?? "mt-10"}`}>
      <div className="bg-primary py-4">
        <div className="main-container mx-auto">
          <div className="w-auto">
            <Link className="mr-auto" href="/">
              <Image
                alt="Logo Immobilienpreise Deutschland"
                className="mr-10"
                src={brwLogo}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="main-container mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
          {GeneralLinks.map((group, groupIndex) => (
            <div className="mb-8" key={groupIndex}>
              {group.sections.map((section, sectionIndex) => (
                <div className="mb-6" key={sectionIndex}>
                  <Typography variant="h4">{section.heading}</Typography>
                  <div className="mx-auto grid grid-flow-row grid-cols-1 gap-y-2 sm:grid md:justify-start">
                    {section.links.map((link, index) => (
                      <Link
                        className={`block truncate text-base no-underline ${link.bold ? "font-medium" : ""
                          } ${link.addMargin ? "mb-4" : ""}`}
                        href={link.slug}
                        key={index}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-100 py-2">
        <div className="main-container mx-auto pt-4 pb-2">
          <div className="grid grid-flow-col justify-between gap-x-10">
            <p className="mb-0 text-base">Copyright © 2026</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <p className="mb-0 text-base">All rights reserved.</p>
              <Link
                className="truncate text-base text-gray-600 no-underline"
                href="/impressum"
                target="_blank"
              >
                Impressum
              </Link>
              <Link
                className="truncate text-base text-gray-600 no-underline"
                href="/datenschutz"
                target="_blank"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
