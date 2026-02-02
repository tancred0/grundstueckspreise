import { BewertungsFunnel } from "@/components/funnel/bewertung/bewertung-funnel";
import BreadCrumbsAuthorities from "@/components/layout/BreadcrumbsAuthorities";
import AsideComponent from "@/components/layout/ContentSectionDesktop";
import MobileContentSection from "@/components/layout/ContentSectionMobile";
import Footer from "@/components/layout/Footer";
import HeroNew from "@/components/layout/hero-new";
import type { PriceCityData, PriceStateData } from "@/server/cms/types";
import CityPriceEnum from "./city-price-enum";

export default function StatePricePage({
	data,
	cities,
}: {
	data: PriceStateData;
	cities: PriceCityData[];
}) {
	const currentSlug = `/immobilienpreise/${data.stateSlug.current}`;
	const h1 = `Immobilienpreise und Quadratmeterpreise ${data.stateName} 2026`;
	const sectionOfContent = [
		`Immobilienpreise und Quadratmeterpreise in ${data.stateName}`,
	];

	return (
		<>
			<main className="main-container">
				<BreadCrumbsAuthorities
					path="immobilienpreise"
					stateName={data.stateName}
					stateSlug={data.stateSlug.current}
				/>
				<div className="grid grid-cols-4 gap-x-10 gap-y-14">
					<AsideComponent headings={sectionOfContent} />
					<div className="col-span-4 md:col-span-3" id="main-content">
						<HeroNew h1={h1} />
						{/* <InfoComponent rating={data.rating} isDistrict={false} /> */}
						<MobileContentSection headings={sectionOfContent} />
						<BewertungsFunnel locationName={data.stateName} />
						<CityPriceEnum
							cities={cities}
							currentSlug={currentSlug}
							heading={sectionOfContent[0] ?? ""}
							sectionNumber={1}
						/>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
