import ContentSection from "@/components/content/12-city-price/content-section";
import PriceContentSection from "@/components/content/12-city-price/price-content-section";
import PriceNeighboringCities from "@/components/content/12-city-price/price-neigboring-cities";
import { TablePricesChange } from "@/components/content/12-city-price/table-price-change";
import { TablePricesFactor } from "@/components/content/12-city-price/table-price-factor";
import { BewertungsFunnel } from "@/components/funnel/bewertung/bewertung-funnel";
import { PageBreadcrumbs } from "@/components/layout/Breadcrumbs";
import AsideDesktop from "@/components/layout/AsideDesktop";
import MobileTocSticky from "@/components/layout/MobileTocSticky";
import ProgressBar from "@/components/layout/ProgressBar";
import Faqs from "@/components/layout/Faqs";
import Footer from "@/components/layout/Footer";
import HeroNew from "@/components/layout/hero-new";
import { Section, Typography } from "@/components/ui/typography";
import type { PriceCityData, PriceDistrictData } from "@/server/cms/types";
import { TableNeighboringCitiesBuyPrices } from "../12-city-price/table-neighboring-cities";
import {
  TableNeighboringDistrictsApartments,
  TableNeighboringDistrictsHouses,
} from "../12-city-price/table-neighboring-districts";
import CTA from "../cta/cta-button";
import { CTA_BewertungVariant } from "../cta/cta-bewertung";

export default function DistrictPagePrice({
  data,
}: {
  data: PriceDistrictData;
}) {
  // Define sections with conditional visibility
  const isCityState = data.stateSlug === null;

  const sectionDefs = [
    { key: "intro", title: `Wie haben sich die Immobilienpreise in ${data.cityName}-${data.districtName} entwickelt (2020-2026)?`, show: true },
    { key: "houses", title: `Wie haben sich die Hauspreise in ${data.cityName}-${data.districtName} entwickelt (2020-2026)?`, show: true },
    { key: "apartments", title: `Wie haben sich die Wohnungspreise in ${data.cityName}-${data.districtName} entwickelt (2020-2026)?`, show: true },
    { key: "property", title: `Aktuelle Grundstückspreise in ${data.cityName}-${data.districtName} 2026`, show: true },
    { key: "rent", title: `Wie haben sich die Mietpreise in ${data.cityName}-${data.districtName} entwickelt (2020-2026)?`, show: true },
    { key: "neighboring", title: `Immobilienpreise in benachbarten Städten in ${data.cityName}-${data.districtName} 2026 entwickelt?`, show: !isCityState },
    { key: "factors", title: `Was beeinflusst die Immobilienpreise in ${data.cityName}-${data.districtName}?`, show: true },
    { key: "faq", title: `Fragen und Antworten zu Immobilienpreisen in ${data.cityName}-${data.districtName}`, show: !!data.faqsList },
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
      ? `https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/${data.citySlug}/${data.districtSlug.current}`
      : `https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/${data.stateSlug}/${data.citySlug}/${data.districtSlug.current}`;

  // const schema = generateBodenrichtwertSchemaCity({
  //   city: data.cityName,
  //   state: data.stateName,
  //   stateSlug: data.stateSlug,
  //   citySlug: data.citySlug.current,
  //   rating: data.rating,
  //   averageValue: data.avgBrw,
  //   baseUrl: "https://www.immobilienpreise-2026.de",
  //   gutachterName: data.gutachterInfoContent ? data.gutachterInfoContent.adressName : data.gutachterInfo ? data.gutachterInfo.adressLine1 : "",
  //   gutachterUrl: data.gutachterInfoContent ? data.gutachterInfoContent.website : data.gutachterInfo ? data.gutachterInfo.website : "",
  //   yearRange: "2003-2026",
  // });
  const h1 = `Immobilienpreise und Quadratmeterpreise ${data.cityName}-${data.districtName} 2026`;

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
                      { label: data.cityName, href: `/${data.stateSlug}/${data.citySlug}` },
                      { label: data.districtName },
                    ]
                    : [
                      { label: data.cityName, href: `/${data.citySlug}` },
                      { label: data.districtName },
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
              firstTable={
                data.cityType === "subdistricts" ? (
                  <TableNeighboringDistrictsHouses
                    colType="minmax"
                    neighboringCitiesData={data.subdistricts}
                    sortByDistance={false}
                    withLink={false}
                  />
                ) : undefined
              }
              heading={getHeading("intro")}
              introSection={data.sectionIntro}
              legendTitlePrimary="Kaufpreis Häuser (€/m²)"
              legendTitleSecondary="Kaufpreis Wohnungen (€/m²)"
              primaryIsBuy={true}
              secondaryIsBuy={true}
              secondTable={
                data.cityType === "subdistricts" ? (
                  <TableNeighboringDistrictsApartments
                    colType="minmax"
                    neighboringCitiesData={data.subdistricts}
                    sortByDistance={false}
                    withLink={false}
                  />
                ) : undefined
              }
              section={data.sectionBuyingMarket}
              section2={data.sectionBuyingMarket2}
              sectionNumber={getSectionNumber("intro")}
              typePrimary="Häuser"
              typeSecondary="Wohnungen"
              renderBelow={
                <CTA_BewertungVariant
                  locationName={`${data.cityName}-${data.districtName}`}
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
                <TableNeighboringDistrictsHouses
                  neighboringCitiesData={data.neighboringDistricts}
                  withLink={true}
                />
              }
              section={data.sectionHousePrices}
              section2={
                data.neighboringDistricts.length === 0
                  ? undefined
                  : data.sectionHousePrices2
              }
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
                <TableNeighboringDistrictsApartments
                  neighboringCitiesData={data.neighboringDistricts}
                  withLink={true}
                />
              }
              section={data.sectionApartmentPrices}
              section2={
                data.neighboringDistricts.length === 0
                  ? undefined
                  : data.sectionApartmentPrices2
              }
              sectionNumber={getSectionNumber("apartments")}
              typePrimary="Kaufen"
              typeSecondary="Mieten"
              renderBelow={
                <CTA_BewertungVariant
                  locationName={`${data.cityName}-${data.districtName}`}
                  cityName={data.cityName}
                  variant="speed"
                  className="mt-6"
                />
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
                  <CTA_BewertungVariant
                    locationName={`${data.cityName}-${data.districtName}`}
                    cityName={data.cityName}
                    variant="local"
                    className="mt-6"
                  />
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
