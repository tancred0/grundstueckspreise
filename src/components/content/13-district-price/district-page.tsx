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

export default function DistrictPagePrice({
	data,
}: {
	data: PriceDistrictData;
}) {
	const sectionOfContent = [
		`Wie haben sich die Immobilienpreise in ${data.cityName}-${data.districtName} entwickelt (2020-2026)?`,
		`Wie haben sich die Hauspreise in ${data.cityName}-${data.districtName} entwickelt (2020-2026)?`,
		`Wie haben sich die Wohnungspreise in ${data.cityName}-${data.districtName} entwickelt (2020-2026)?`,
		`Aktuelle Grundstückspreise in ${data.cityName}-${data.districtName} 2026`,
		`Wie haben sich die Mietpreise in ${data.cityName}-${data.districtName} entwickelt (2020-2026)?`,
		`Immobilienpreise in benachbarten Städten in ${data.cityName}-${data.districtName} 2026 entwickelt?`,
		`Was beeinflusst die Immobilienpreise in ${data.cityName}-${data.districtName}?`,
		`Fragen und Antworten zu Immobilienpreisen in ${data.cityName}-${data.districtName}`,
	];

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
			<MobileTocSticky headings={sectionOfContent} />
			<main className="main-container mt-6 md:mt-10">
				<div className="grid grid-cols-4 gap-x-10">
					<AsideDesktop
						headings={sectionOfContent}
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
						<Section>
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
							heading={sectionOfContent[0]!}
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
							sectionNumber={1}
							typePrimary="Häuser"
							typeSecondary="Wohnungen"
							// firstTable={
							//   <>
							//   <h4 className="mb-0">Durschnittspreise für Häuser pro Jahr</h4>
							//   <TablePricesChange
							//     houseRentData={data.houseBuy}
							//     type="buy"
							//   />
							//   </>
							// }
							// secondTable={
							//   <>
							//   <h4 className="mb-0">Durschnittspreise für Wohnungen pro Jahr</h4>
							//   <TablePricesChange
							//     houseRentData={data.apartmentBuy}
							//     type="buy"
							//   />
							//   </>
							// }
							// section3={data.sectionBuyingMarket3}
							// thirdTable={
							//   <TablePricesRatio
							//     houseBuyData={data.houseBuy}
							//     apartmentBuyData={data.apartmentBuy}
							//   />
							// }
						/>
						</Section>
						<Section>
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
								heading={sectionOfContent[1]!}
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
								sectionNumber={2}
								typePrimary="Kaufen"
								typeSecondary="Mieten"
							/>
						</Section>
						<Section>
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
								heading={sectionOfContent[2]!}
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
								sectionNumber={3}
								typePrimary="Kaufen"
								typeSecondary="Mieten"
							/>
						</Section>
						<Section>
							<ContentSection
								heading={sectionOfContent[3]!}
								section={data.sectionPropertyPrices}
								sectionNumber={4}
							/>
						</Section>
						<Section>
							<PriceContentSection
								dataPrimary={data.houseRent}
								dataSecondary={data.apartmentRent}
								firstTable={
									<TablePricesChange houseRentData={data.houseRent} type="rent" />
								}
								heading={sectionOfContent[4]!}
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
								sectionNumber={5}
								typePrimary="Häuser"
								typeSecondary="Wohnungen"
							/>
						</Section>
						<Section>
							<PriceNeighboringCities
								heading={sectionOfContent[5]!}
								neighboringCitiesData={data.neighboringCities}
								sectionNeighboringCityBuyPrices={
									data.sectionNeighboringCityBuyPrices
								}
								sectionNeighboringCityRentPrices={
									data.sectionNeighboringCityRentPrices
								}
								sectionNumber={6}
							/>
						</Section>
						<Section>
							<ContentSection
								heading={sectionOfContent[6]!}
								section={data.sectionDrivingFactors}
								sectionNumber={7}
							/>
						</Section>
						{data.faqsList && (
							<Section>
								<Faqs
									faqs={data.faqsList}
									heading={sectionOfContent[7]!}
									sectionNumber={8}
								/>
							</Section>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

// 1. Bodenrichtwerte benachbarter Stadtteile -> Immobilienpreise benachbarter Stadtteile
