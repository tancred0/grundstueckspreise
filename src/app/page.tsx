import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { BewertungsFunnel } from "@/components/funnel/bewertung/bewertung-funnel";
import { Typography, Section } from "@/components/ui/typography";
import nrwImage from "@/images/bundesland/nrw.svg";
import bayernImage from "@/images/bundesland/bayern.svg";
import hessenImage from "@/images/bundesland/hessen.svg";
import rpImage from "@/images/bundesland/rlp.svg";
import bwImage from "@/images/bundesland/bw.svg";
import shImage from "@/images/bundesland/sh.svg";
import brandenburgImage from "@/images/bundesland/brandenburg.svg";
import niedersachsenImage from "@/images/bundesland/niedersachsen.svg";
import sachsenImage from "@/images/bundesland/sachsen.svg";
import mvImage from "@/images/bundesland/mv.svg";
import sachsenAnhaltImage from "@/images/bundesland/sachsen-anhalt.svg";
import thueringenImage from "@/images/bundesland/thueringen.svg";
import saarlandImage from "@/images/bundesland/saarland.svg";
import berlinImage from "@/images/bundesland/berlin.svg";
import hamburgImage from "@/images/bundesland/hamburg.svg";
import bremenImage from "@/images/bundesland/bremen.svg";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const states = [
  {
    name: "Berlin",
    link: "/berlin",
    image: berlinImage,
    active: true,
  },
  {
    name: "Hamburg",
    link: "/hamburg",
    image: hamburgImage,
    active: false,
  },
  {
    name: "Bremen",
    link: "/bremen",
    image: bremenImage,
    active: false,
  },
  {
    name: "Bayern",
    link: "/bayern",
    image: bayernImage,
    active: false,
  },
  {
    name: "NRW",
    link: "/nrw",
    image: nrwImage,
    active: false,
  },
  {
    name: "Hessen",
    link: "/hessen",
    image: hessenImage,
    active: false,
  },
  {
    name: "Baden-Württemberg",
    link: "/bw",
    image: bwImage,
    active: false,
  },
  {
    name: "Schleswig-Holstein",
    link: "/schleswig-holstein",
    image: shImage,
    active: false,
  },
  {
    name: "Sachsen",
    link: "/sachsen",
    image: sachsenImage,
    active: false,
  },
  {
    name: "Mecklenburg-Vorpommern",
    link: "/mv",
    image: mvImage,
    active: false,
  },
  {
    name: "Thüringen",
    link: "/thueringen",
    image: thueringenImage,
    active: false,
  },
  {
    name: "Saarland",
    link: "/saarland",
    image: saarlandImage,
    active: false,
  },
  {
    name: "Rheinland-Pfalz",
    link: "/rlp",
    image: rpImage,
    active: false,
  },
  {
    name: "Sachsen-Anhalt",
    link: "/sachsen-anhalt",
    image: sachsenAnhaltImage,
    active: false,
  },
  {
    name: "Brandenburg",
    link: "/brandenburg",
    image: brandenburgImage,
    active: false,
  },
  {
    name: "Niedersachsen",
    link: "/niedersachsen",
    image: niedersachsenImage,
    active: false,
  },
];


export default async function Home() {
  const h1 = "Grundstückspreise in Deutschland 2026";
  const h2 = "Übersicht der einzelnen Bundesländer"
  return (
    <>
      <main className="main-container mx-auto text-center max-w-6xl mt-6 md:mt-10">
        <Section className="pt-0 md:pt-0">
          <Typography variant="h1">{h1}</Typography>
          <BewertungsFunnel className="mt-4" />
        </Section>
        <Section id="sec1">
          <Typography variant="h2">{h2}</Typography>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            {states.map((state) => (
              <ButtonMainPage key={state.link} link={state.link} name={state.name} type="grundstuecke" image={state.image} active={state.active} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}


const ButtonMainPage = ({ type = "grundstuecke", link, name, image, active = true }: { type: "grundstuecke", link: string, name: string, image?: StaticImageData | null, active?: boolean }) => {
  const labels = {
    "immopreise": "Immobilienpreise",
    "grundstuecke": "Grundstückspreise"
  }

  const content = (
    <div className={`rounded-md bg-accent px-6 py-4 ${!active ? "opacity-50" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {image && <div className="w-12">
            <Image src={image} alt={name} height={32} />
          </div>
          }
          {type === "grundstuecke" ? (
            <h3 className="flex flex-col font-medium my-0 text-base text-left">
              <span className="text-gray-400 text-base">{labels[type]}</span>
              <span className="block">{name}</span>
            </h3>
          ) : null
          }
        </div>
        {active ? (
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        ) : (
          <span className="text-sm text-gray-400 shrink-0">Bald verfügbar</span>
        )}
      </div>
    </div>
  );

  if (!active) {
    return (
      <div className="rounded-md cursor-not-allowed">
        {content}
      </div>
    );
  }

  return (
    <Link href={link} className="rounded-md no-underline hover:outline-2 hover:outline-primary">
      {content}
    </Link>
  );
}

