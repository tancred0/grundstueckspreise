import ContentSection from "@/components/content/12-city-price/content-section";
import PriceContentSection from "@/components/content/12-city-price/price-content-section";
import PriceNeighboringCities from "@/components/content/12-city-price/price-neigboring-cities";
import { TablePricesChange } from "@/components/content/12-city-price/table-price-change";
import { TablePricesFactor } from "@/components/content/12-city-price/table-price-factor";
import { BewertungsFunnel } from "@/components/funnel/bewertung/bewertung-funnel";
import BreadCrumbs from "@/components/layout/Breadcrumbs";
import BreadCrumbsAuthorities from "@/components/layout/BreadcrumbsAuthorities";
import DistrictAside from "@/components/layout/ContentSectionDesktop";
import Faqs from "@/components/layout/Faqs";
import Footer from "@/components/layout/Footer";
import HeroNew from "@/components/layout/hero-new";
import { Typography } from "@/components/ui/typography";
import type { PriceCityData, PriceDistrictData } from "@/server/cms/types";
import { TableNeighboringCitiesBuyPrices } from "../12-city-price/table-neighboring-cities";
import {
	TableNeighboringDistrictsApartments,
	TableNeighboringDistrictsHouses,
} from "../12-city-price/table-neighboring-districts";
import CTA from "../general/CTA";

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
	//   baseUrl: "https://www.immobilienpreise-deutschland.com",
	//   gutachterName: data.gutachterInfoContent ? data.gutachterInfoContent.adressName : data.gutachterInfo ? data.gutachterInfo.adressLine1 : "",
	//   gutachterUrl: data.gutachterInfoContent ? data.gutachterInfoContent.website : data.gutachterInfo ? data.gutachterInfo.website : "",
	//   yearRange: "2003-2026",
	// });
	const h1 = `Immobilienpreise und Quadratmeterpreise ${data.cityName}-${data.districtName} 2026`;

	return (
		<>
			{/* <SchemaOrg schema={schema} /> */}
			<main className="main-container">
				<BreadCrumbsAuthorities
					cityName={data.cityName}
					districtName={data.districtName}
					path="immobilienpreise"
					stateName={data.stateName}
					stateSlug={data.stateSlug}
				/>
				<div className="grid grid-cols-4 gap-x-10 gap-y-14">
					<DistrictAside headings={sectionOfContent} />
					<div className="col-span-4 md:col-span-3" id="main-content">
						<HeroNew h1={h1} />
						<BewertungsFunnel
							cityName={data.cityName}
							className="mt-4"
							locationName={data.cityName}
						/>
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

						<ContentSection
							heading={sectionOfContent[3]!}
							section={data.sectionPropertyPrices}
							sectionNumber={4}
							// renderBelow={
							// <CTA
							//   cta={`Zur Bodenrichtwert-Seite für ${data.cityName}`}
							//   pageLink={brwSlug}
							// />
							// }
						/>
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

						<ContentSection
							heading={sectionOfContent[6]!}
							section={data.sectionDrivingFactors}
							sectionNumber={7}
						/>

						{data.faqsList && (
							<Faqs
								faqs={data.faqsList}
								heading={sectionOfContent[7]!}
								sectionNumber={8}
							/>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

// 1. Bodenrichtwerte benachbarter Stadtteile -> Immobilienpreise benachbarter Stadtteile
