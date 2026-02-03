import { BewertungsFunnel } from "@/components/funnel/bewertung/bewertung-funnel";
import { PageBreadcrumbs } from "@/components/layout/Breadcrumbs";
import AsideDesktop from "@/components/layout/AsideDesktop";
import MobileContentSection from "@/components/layout/ContentSectionMobile";
import MobileTocSticky from "@/components/layout/MobileTocSticky";
import ProgressBar from "@/components/layout/ProgressBar";
import Footer from "@/components/layout/Footer";
import HeroNew from "@/components/layout/hero-new";
import { Section } from "@/components/ui/typography";
import type { PriceCityData, PriceStateData } from "@/server/cms/types";
import CityPriceEnum from "./city-price-enum";

export default function tStatePricePage({
	data,
	cities,
}: {
	data: PriceStateData;
	cities: PriceCityData[];
}) {
	const currentSlug = `/${data.stateSlug.current}`;
	const h1 = `Immobilienpreise und Quadratmeterpreise ${data.stateName} 2026`;
	const sectionOfContent = [
		`Immobilienpreise und Quadratmeterpreise in ${data.stateName}`,
	];

	const breadcrumbItems = [
		{ label: data.stateName },
	];

	return (
		<>
			<ProgressBar />
			<MobileTocSticky headings={sectionOfContent} />
			<main className="main-container mt-6 md:mt-10">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-x-10">
					<AsideDesktop
						headings={sectionOfContent}
						breadcrumbs={<PageBreadcrumbs items={breadcrumbItems} />}
					/>

					{/* Main content */}
					<div className="col-span-1 md:col-span-3" id="main-content">
						<Section className="pt-0 md:pt-0">
							<HeroNew h1={h1} />
							<MobileContentSection headings={sectionOfContent} />
							<BewertungsFunnel locationName={data.stateName} />
						</Section>
						<Section>
							<CityPriceEnum
								cities={cities}
								currentSlug={currentSlug}
								heading={sectionOfContent[0] ?? ""}
								sectionNumber={1}
							/>
						</Section>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
