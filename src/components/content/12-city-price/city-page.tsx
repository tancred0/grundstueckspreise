import { BewertungsFunnel } from "@/components/funnel/bewertung/bewertung-funnel";
import { PageBreadcrumbs } from "@/components/layout/Breadcrumbs";
import AsideDesktop from "@/components/layout/AsideDesktop";
import MobileTocSticky from "@/components/layout/MobileTocSticky";
import ProgressBar from "@/components/layout/ProgressBar";
import Faqs from "@/components/layout/Faqs";
import Footer from "@/components/layout/Footer";
import HeroNew from "@/components/layout/hero-new";
import { Section, Typography } from "@/components/ui/typography";
import type { PriceCityData } from "@/server/cms/types";
import ContentSection from "./content-section";
import PriceContentSection from "./price-content-section";
import PriceNeighboringCities from "./price-neigboring-cities";
import {
  TableNeighboringDistrictsApartments,
  TableNeighboringDistrictsHouses,
} from "./table-neighboring-districts";
import { TablePricesChange } from "./table-price-change";
import { TablePricesFactor } from "./table-price-factor";
import { CTA_BewertungVariant } from "../cta/cta-bewertung";

export default function CityPagePrice({ data }: { data: PriceCityData }) {
  // Define sections with conditional visibility
  const isCityState = data.stateSlug === null;

  const sectionDefs = [
    { key: "intro", title: `Wie haben sich die Immobilienpreise in ${data.cityName} entwickelt (2020-2026)?`, show: true },
    { key: "houses", title: `Wie haben sich die Hauspreise in ${data.cityName} entwickelt (2020-2026)?`, show: true },
    { key: "apartments", title: `Wie haben sich die Wohnungspreise in ${data.cityName} entwickelt (2020-2026)?`, show: true },
    { key: "property", title: `Aktuelle Grundstückspreise in ${data.cityName} 2026`, show: true },
    { key: "rent", title: `Wie haben sich die Mietpreise in ${data.cityName} entwickelt (2020-2026)?`, show: true },
    { key: "neighboring", title: `Immobilienpreise in benachbarten Städten in ${data.cityName} 2026 entwickelt?`, show: !isCityState },
    { key: "factors", title: `Was beeinflusst die Immobilienpreise in ${data.cityName}?`, show: true },
    { key: "faq", title: `Fragen und Antworten zu Immobilienpreisen in ${data.cityName}`, show: !!data.faqsList },
  ];

  // Filter to visible sections for TOC
  const visibleSections = sectionDefs.filter(s => s.show);
  const sectionTitles = visibleSections.map(s => s.title);

  // Helper to get section number by key (returns 0 if hidden)
  const getSectionNumber = (key: string) => {
    const idx = visibleSections.findIndex(s => s.key === key);
    return idx >= 0 ? idx + 1 : 0;
  };

  // Helper to get heading by key
  const getHeading = (key: string) => sectionDefs.find(s => s.key === key)?.title ?? "";

  const brwSlug =
    data.stateSlug === null
      ? `https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/${data.citySlug.current}`
      : `https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/${data.stateSlug}/${data.citySlug.current}`;

  // const schema = generateBodenrichtwertSchemaCity({
  //   city: data.cityName,
  //   state: data.stateName,
  //   stateSlug: data.stateSlug,
  //   citySlug: data.citySlug.current,
  //   rating: data.rating,
  //   averageValue: data.avgBrw,
  //   baseUrl: "https://www.grundstueckspreise-deutschland.de",
  //   gutachterName: data.gutachterInfoContent ? data.gutachterInfoContent.adressName : data.gutachterInfo ? data.gutachterInfo.adressLine1 : "",
  //   gutachterUrl: data.gutachterInfoContent ? data.gutachterInfoContent.website : data.gutachterInfo ? data.gutachterInfo.website : "",
  //   yearRange: "2003-2026",
  // });
  const h1 = `Immobilienpreise und Quadratmeterpreise ${data.cityName} 2026`;
  return (
    <>
      {/* <SchemaOrg schema={schema} /> */}
      <ProgressBar />
      <MobileTocSticky headings={sectionTitles} />
      <main className="main-container mt-6 md:mt-10">
        <div className="grid grid-cols-4 gap-x-10">
          <AsideDesktop
            headings={sectionTitles}
            breadcrumbs={
              <PageBreadcrumbs
                items={
                  data.stateSlug
                    ? [
                      { label: data.stateName, href: `/${data.stateSlug}` },
                      { label: data.cityName },
                    ]
                    : [
                      { label: data.cityName },
                    ]
                }
              />
            }
          />
          <div className="col-span-4 md:col-span-3" id="main-content">
            <Section className="pt-0 md:pt-0">
              <HeroNew h1={h1} />
              <BewertungsFunnel
                cityName={data.cityName}
                className="mt-4"
                locationName={data.cityName}
              />
            </Section>
            <PriceContentSection
              dataPrimary={data.houseBuy}
              dataSecondary={data.apartmentBuy}
              heading={getHeading("intro")}
              introSection={data.sectionIntro}
              legendTitlePrimary="Kaufpreis Häuser (€/m²)"
              legendTitleSecondary="Kaufpreis Wohnungen (€/m²)"
              primaryIsBuy={true}
              secondaryIsBuy={true}
              section={data.sectionBuyingMarket}
              section2={data.sectionBuyingMarket2}
              section3={data.sectionBuyingMarket3}
              sectionNumber={getSectionNumber("intro")}
              typePrimary="Häuser"
              typeSecondary="Wohnungen"
              // secondTable={
              //   <TablePricesChange
              //     houseRentData={data.apartmentBuy}
              //     type="buy"
              //   />
              // }
              // section3={data.sectionBuyingMarket3}
              // thirdTable={
              //   <TablePricesRatio
              //     houseBuyData={data.houseBuy}
              //     apartmentBuyData={data.apartmentBuy}
              //   />
              // }
              renderBelow={
                <CTA_BewertungVariant 
                locationName={data.cityName} 
                cityName={data.cityName}
                 variant="professional" 
                 className="mt-6" 
                 />
              }
            />
            <PriceContentSection
              dataPrimary={data.houseBuy}
              dataSecondary={data.houseRent}
              firstTable={
                <>
                  <Typography variant="h4" className="mb-0">
                    Durchschnittspreise für Häuser pro Jahr
                  </Typography>
                  <TablePricesFactor
                    houseBuyData={data.houseBuy}
                    houseRentData={data.houseRent}
                  />
                </>
              }
              heading={getHeading("houses")}
              legendTitlePrimary="Kaufpreis Häuser (€/m²)"
              legendTitleSecondary="Mietpreis Häuser (€/m²)"
              primaryIsBuy={true}
              secondaryIsBuy={false}
              secondTable={
                [
                  "subdistricts",
                  "districts_onpage",
                  "districts_newpage",
                ].includes(data.cityType) ? (
                  <TableNeighboringDistrictsHouses
                    neighboringCitiesData={data.districts}
                    sortByDistance={false}
                    withLink={["districts_newpage", "subdistricts"].includes(
                      data.cityType,
                    )}
                    groupByBezirk={isCityState}
                  />
                ) : undefined
              }
              section={data.sectionHousePrices}
              section2={data.sectionHousePrices2}
              sectionNumber={getSectionNumber("houses")}
              typePrimary="Kaufen"
              typeSecondary="Mieten"
            />
            <PriceContentSection
              dataPrimary={data.apartmentBuy}
              dataSecondary={data.apartmentRent}
              firstTable={
                <>
                  <Typography variant="h4" className="mb-0">
                    Durchschnittspreise für Wohnungen pro Jahr
                  </Typography>
                  <TablePricesFactor
                    houseBuyData={data.apartmentBuy}
                    houseRentData={data.apartmentRent}
                  />
                </>
              }
              heading={getHeading("apartments")}
              legendTitlePrimary="Kaufpreis Wohnungen (€/m²)"
              legendTitleSecondary="Mietpreis Wohnungen (€/m²)"
              primaryIsBuy={true}
              secondaryIsBuy={false}
              secondTable={
                [
                  "subdistricts",
                  "districts_onpage",
                  "districts_newpage",
                ].includes(data.cityType) ? (
                  <TableNeighboringDistrictsApartments
                    neighboringCitiesData={data.districts}
                    sortByDistance={false}
                    withLink={["districts_newpage", "subdistricts"].includes(
                      data.cityType,
                    )}
                    groupByBezirk={isCityState}
                  />
                ) : undefined
              }
              section={data.sectionApartmentPrices}
              section2={data.sectionApartmentPrices2}
              sectionNumber={getSectionNumber("apartments")}
              typePrimary="Kaufen"
              typeSecondary="Mieten"
              renderBelow={
                <CTA_BewertungVariant locationName={data.cityName} cityName={data.cityName} variant="speed" className="mt-6" />
              }
            />
            <ContentSection
              heading={getHeading("property")}
              section={data.sectionPropertyPrices}
              sectionNumber={getSectionNumber("property")}
            />
            <PriceContentSection
              dataPrimary={data.houseRent}
              dataSecondary={data.apartmentRent}
              firstTable={
                <TablePricesChange houseRentData={data.houseRent} type="rent" />
              }
              heading={getHeading("rent")}
              legendTitlePrimary="Mietpreis Häuser (€/m²)"
              legendTitleSecondary="Mietpreis Wohnungen (€/m²)"
              primaryIsBuy={false}
              secondaryIsBuy={false}
              secondTable={
                <TablePricesChange
                  houseRentData={data.apartmentRent}
                  type="rent"
                />
              }
              section={data.sectionRentingMarket}
              section2={data.sectionRentingMarket2}
              sectionNumber={getSectionNumber("rent")}
              typePrimary="Häuser"
              typeSecondary="Wohnungen"
            />
            {getSectionNumber("neighboring") > 0 && (
              <PriceNeighboringCities
                heading={getHeading("neighboring")}
                neighboringCitiesData={data.neighboringCities}
                sectionNeighboringCityBuyPrices={
                  data.sectionNeighboringCityBuyPrices
                }
                sectionNeighboringCityRentPrices={
                  data.sectionNeighboringCityRentPrices
                }
                sectionNumber={getSectionNumber("neighboring")}
                renderBelow={
                  <CTA_BewertungVariant locationName={data.cityName} cityName={data.cityName} variant="local" className="mt-6" />
                }
              />
            )}
            <ContentSection
              heading={getHeading("factors")}
              section={data.sectionDrivingFactors}
              sectionNumber={getSectionNumber("factors")}
            />
            {getSectionNumber("faq") > 0 && (
              <Faqs
                faqs={data.faqsList!}
                heading={getHeading("faq")}
                sectionNumber={getSectionNumber("faq")}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
