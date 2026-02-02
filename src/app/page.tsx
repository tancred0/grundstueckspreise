import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";

import { Sanity } from "@/server/cms/Sanity";
import Footer from "@/components/layout/Footer";

import BreadCrumbsAuthorities from "@/components/layout/BreadcrumbsAuthorities";
import MobileContentSection from "@/components/layout/ContentSectionMobile";
import Sources from "@/components/layout/Sources";
import AsideComponent from "@/components/layout/ContentSectionDesktop";
import Hero from "@/components/layout/Hero";
import { BewertungsFunnel } from "@/components/funnel/bewertung/bewertung-funnel";

const states = [
  {
    name: "NRW",
    link: "/immobilienpreise/nrw",
    active: true,
  },
  {
    name: "Berlin",
    link: "/immobilienpreise/berlin",
    active: false,

  },
  {
    name: "Hamburg",
    link: "/immobilienpreise/hamburg",
    active: false,

  },
  {
    name: "Bremen",
    link: "/immobilienpreise/bremen",
    active: false,
  },
  {
    name: "Bayern",
    link: "/immobilienpreise/bayern",
    active: false,

  },
  {
    name: "Hessen",
    link: "/immobilienpreise/hessen",
    active: false,
  },
  {
    name: "Rheinland-Pfalz",
    link: "/immobilienpreise/rlp",
    active: false,
  },
  {
    name: "Baden-Württemberg",
    link: "/immobilienpreise/bw",
    active: false,
  },
  {
    name: "Schleswig-Holstein",
    link: "/immobilienpreise/schleswig-holstein",
    active: false,
  },
  {
    name: "Brandenburg",
    link: "/immobilienpreise/brandenburg",
    active: false,
  },
  {
    name: "Niedersachsen",
    link: "/immobilienpreise/niedersachsen",
    active: false,
  },
  {
    name: "Sachsen",
    link: "/immobilienpreise/sachsen",
    active: false,
  },
  {
    name: "Mecklenburg-Vorpommern",
    link: "/immobilienpreise/mecklenburg-vorpommern",
    active: false,
  },
  {
    name: "Sachsen-Anhalt",
    link: "/immobilienpreise/sachsen-anhalt",
    active: false,
  },
  {
    name: "Thüringen",
    link: "/immobilienpreise/thueringen",
    active: false,
  },
  {
    name: "Saarland",
    link: "/immobilienpreise/saarland",
    active: false,
  },
].sort((a, b) => {
  // First sort by active status (active items first)
  if (a.active !== b.active) {
    return a.active ? -1 : 1;
  }
  // Then sort alphabetically by name
  return a.name.localeCompare(b.name);
});


const fetchData = cache(() => {
  const sanity = new Sanity();
  const data = sanity.getCategoryBlog("immobilienpreise");
  return data;
});

export async function generateMetadata(): Promise<Metadata> {
  const title = "Immobilienpreise und Quadratmeterpreise in Deutschland 2026";
  const description =
    "Übersicht über die Immobilienpreise und Quadratmeterpreise in Deutschland 2026";
  return {
    title: title,
    description: description,
    alternates: {
      canonical: "https://www.immobilienpreise-deutschland.com",
    },
  };
}

export default async function Home() {
  const data = await fetchData();

  const sectionOfContent = data.sections.map((item) => item.heading);
  // if (data.faqsList) {
  //   sectionOfContent.push(faqTitle);
  // }
  const h1 = "Immobilienpreise und Quadratmeterpreise in Deutschland 2026";
  return (
    <>
      <main className="main-container">
        <BreadCrumbsAuthorities path={"immobilienpreise"} className="mb-6" />
        <div className="grid grid-cols-4 gap-x-10	gap-y-14">
          <AsideComponent headings={sectionOfContent} />
          <div id="main-content" className="col-span-4 md:col-span-3 ">
            <Hero locationName={""} h1={h1} introText={data.introText} />
            <BewertungsFunnel className="mt-4" />
            <MobileContentSection headings={sectionOfContent} />
            <section id={"sec1"}>
              <h2>{sectionOfContent[0]}</h2>
              <table className="table">
                <tbody>
                  {states.map((state) => (
                    <tr className="tr" key={state.name}>
                      <td className="td w-1/2">
                        {state.name}
                      </td>
                      <td className="td w-1/2">
                        {state.active ? (
                          <Link className="table-link" href={state.link}>
                            {`Immobilienpreise ${state.name}`}
                          </Link>
                        ) : (
                          <span className="text-gray-500">Bald verfügbar</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
