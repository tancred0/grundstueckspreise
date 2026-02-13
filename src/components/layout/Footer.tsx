import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import brwLogo from "@/images/general/logo_short_white_font.svg";

const GRUNDSTUECKSPREISE_LINKS = [
  { label: "Grundstückspreise Deutschland", href: "/" },
  { label: "Grundstückspreise Berlin", href: "/berlin" },
];

const BODENRICHTWERTE_LINKS = [
  { label: "Bodenrichtwert Deutschland", href: "https://bodenrichtwerte-deutschland.de" },
];

const IMMOBILIENPREISE_LINKS = [
  { label: "Immobilienpreise Deutschland", href: "https://immobilienpreise-2026.de" },
];

export default function Footer({ classname }: { classname?: string }) {
  return (
    <footer className={`${classname ?? "mt-10"}`}>
      <div className="bg-primary py-1">
        <div className="main-container mx-auto">
          <div className="w-auto">
            <Link className="mr-auto" href="/">
              <Image
                alt="Logo Grundstückspreise Deutschland"
                className="mr-10"
                src={brwLogo}
                height={64}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="main-container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Grundstückspreise Column */}
          <div className="mb-6">
            <Typography variant="h4">Grundstückspreise</Typography>
            <div className="grid grid-flow-row grid-cols-1 gap-y-2">
              {GRUNDSTUECKSPREISE_LINKS.map((link) => (
                <Link
                  className="block truncate text-base no-underline"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bodenrichtwerte Column */}
          <div className="mb-6">
            <Typography variant="h4">Bodenrichtwerte</Typography>
            <div className="grid grid-flow-row grid-cols-1 gap-y-2">
              {BODENRICHTWERTE_LINKS.map((link) => (
                <Link
                  className="block truncate text-base no-underline"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Immobilienpreise Column */}
          <div className="mb-6">
            <Typography variant="h4">Immobilienpreise</Typography>
            <div className="grid grid-flow-row grid-cols-1 gap-y-2">
              {IMMOBILIENPREISE_LINKS.map((link) => (
                <Link
                  className="block truncate text-base no-underline"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-100 py-2">
        <div className="main-container mx-auto pt-4 pb-2">
          <div className="grid grid-flow-col justify-between gap-x-10">
            <p className="mb-0 text-base">Copyright © 2026</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <p className="mb-0 text-base">Alle Rechte vorbehalten.</p>
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
