import Image from "next/image";
import Link from "next/link";
import arrowRight from "@/images/breadcrumbs/arrow-right.svg";
import homeLogo from "@/images/breadcrumbs/home.svg";

export default function BreadCrumbsAuthorities({
	stateName = null,
	stateSlug = null,
	cityName = null,
	citySlug = null,
	districtName = null,
	className = "",
	path = "grundbuchamt",
}: // citySlug = null,
{
	stateName?: string | null;
	stateSlug?: string | null;
	cityName?: string | null;
	citySlug?: string | null;
	districtName?: string | null;
	className?: string;
	path?:
		| "grundbuchamt"
		| "gutachterausschuss"
		| "grundsteuer"
		| "immobilienpreise";
	// citySlug?: string | null;
}) {
	let breadCrumbOnMain = "";
	let breadCrumbOnState = "";

	switch (path) {
		case "grundbuchamt":
			breadCrumbOnMain = "Grundbuchamt";
			breadCrumbOnState = "Grundbuchämter";
			break;
		case "gutachterausschuss":
			breadCrumbOnMain = "Gutachterausschuss";
			breadCrumbOnState = "Gutachterausschüsse";
			break;
		case "grundsteuer":
			breadCrumbOnMain = "Grundsteuer";
			breadCrumbOnState = "Grundsteuer";
			break;
		case "immobilienpreise":
			breadCrumbOnMain = "Immobilienpreise";
			breadCrumbOnState = "Immobilienpreise";
			break;
		default:
			console.log("Error: Path not found");
	}

	return (
		<nav className={className}>
			<div className="mb-4 flex items-center gap-x-1">
				<Link className="flex items-center gap-x-1 text-sm" href={"/"}>
					<Image alt="Home" height={24} src={homeLogo} width={24} />
				</Link>
				<Image alt="Arrow Right" height={24} src={arrowRight} width={24} />

				{/* No stateName: we are on /grundbuchamt */}
				{stateName === null ? (
					<div className="breadcrumb">{breadCrumbOnMain}</div>
				) : (
					<Link className="breadcrumb" href={`/${path}`}>
						{breadCrumbOnState}
					</Link>
				)}

				{/* stateName, no cityName: we are on Statepage */}
				{stateName !== null && cityName === null && (
					<>
						<Image alt="Arrow Right" height={24} src={arrowRight} width={24} />
						<div className="breadcrumb">{stateName}</div>
					</>
				)}

				{/* stateName and cityName, no districtName: we are on Citypage */}
				{stateName !== null && cityName !== null && districtName === null && (
					<>
						<Image alt="Arrow Right" height={24} src={arrowRight} width={24} />
						<Link className="breadcrumb" href={`/${path}/${stateSlug}`}>
							{stateName}
						</Link>
						<Image alt="Arrow Right" height={24} src={arrowRight} width={24} />
						<div className="breadcrumb">{cityName}</div>
					</>
				)}

				{/* stateName, cityName and districtName: we are on Districtpage */}
				{stateName !== null && cityName !== null && districtName !== null && (
					<>
						<Image alt="Arrow Right" height={24} src={arrowRight} width={24} />
						<Link className="breadcrumb" href={`/${path}/${stateSlug}`}>
							{stateName}
						</Link>
						<Image alt="Arrow Right" height={24} src={arrowRight} width={24} />
						<Link
							className="breadcrumb"
							href={`/${path}/${stateSlug}/${citySlug}`}
						>
							{cityName}
						</Link>
						<Image alt="Arrow Right" height={24} src={arrowRight} width={24} />
						<div className="breadcrumb">{districtName}</div>
					</>
				)}
			</div>
		</nav>
	);
}
