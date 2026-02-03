import { Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type BreadcrumbItemType = {
	label: string;
	href?: string;
};

export function PageBreadcrumbs({
	items,
	className,
}: {
	items: BreadcrumbItemType[];
	className?: string;
}) {
	return (
		<Breadcrumb className={cn("mb-4", className)}>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">
							<Home className="size-4" />
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{items.map((item, index) => (
					<Fragment key={index}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{item.href ? (
								<BreadcrumbLink asChild>
									<Link href={item.href}>{item.label}</Link>
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export default function BreadCrumbs({
	stateName = null,
	stateSlug = null,
	cityName = null,
	citySlug = null,
	districtName = null,
	type = "bodenrichtwert",
}: {
	stateName?: string | null;
	stateSlug?: string | null;
	cityName?: string | null;
	citySlug?: string | null;
	districtName?: string | null;
	type?: "bodenrichtwert" | "boris" | "immobilienpreise";
}) {
	const longName =
		type === "immobilienpreise" ? "Immobilienpreise" : "Bodenrichtwerte";
	const shortName = type === "immobilienpreise" ? "Preise" : "BRW";
	const basePath = type === "immobilienpreise" ? "immobilienpreise" : "bodenrichtwert";

	return (
		<Breadcrumb className="mb-4">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link className="flex items-center gap-x-1" href="/">
							<Home className="size-4" />
							<span className="hidden md:inline">{longName}</span>
							<span className="md:hidden">{shortName}</span>
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{stateSlug === null ? (
					<BreadCrumbsNoState
						basePath={basePath}
						cityName={cityName}
						citySlug={citySlug}
						districtName={districtName}
					/>
				) : (
					<BreadCrumbsWithState
						basePath={basePath}
						cityName={cityName}
						citySlug={citySlug}
						districtName={districtName}
						stateName={stateName}
						stateSlug={stateSlug}
					/>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export function BreadCrumbsWithState({
	stateName,
	stateSlug,
	cityName = null,
	citySlug = null,
	districtName = null,
	basePath = "bodenrichtwert",
}: {
	stateName: string | null;
	stateSlug: string | null;
	cityName?: string | null;
	citySlug?: string | null;
	districtName?: string | null;
	basePath?: string;
}) {
	// STATE only: Start(A) => State (IA)
	if (cityName === null) {
		return (
			<BreadcrumbItem>
				<BreadcrumbPage>{stateName}</BreadcrumbPage>
			</BreadcrumbItem>
		);
	}

	// CITY: Start(A) => State (A) => City (IA)
	if (districtName === null) {
		return (
			<>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href={`/${basePath}/${stateSlug}`}>{stateName}</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>{cityName}</BreadcrumbPage>
				</BreadcrumbItem>
			</>
		);
	}

	// DISTRICT: Start(A) => State (A) => City (A) => District (IA)
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink asChild>
					<Link href={`/${basePath}/${stateSlug}`}>{stateName}</Link>
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink asChild>
					<Link href={`/${basePath}/${stateSlug}/${citySlug}`}>{cityName}</Link>
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>{districtName}</BreadcrumbPage>
			</BreadcrumbItem>
		</>
	);
}

function BreadCrumbsNoState({
	cityName,
	citySlug,
	districtName = null,
	basePath = "bodenrichtwert",
}: {
	cityName: string | null;
	citySlug: string | null;
	districtName?: string | null;
	basePath?: string;
}) {
	// CITY only (Berlin/Hamburg): Start(A) => City (IA)
	if (districtName === null) {
		return (
			<BreadcrumbItem>
				<BreadcrumbPage>{cityName}</BreadcrumbPage>
			</BreadcrumbItem>
		);
	}

	// DISTRICT (Berlin/Hamburg): Start(A) => City (A) => District (IA)
	return (
		<>
			<BreadcrumbItem>
				<BreadcrumbLink asChild>
					<Link href={`/${basePath}/${citySlug}`}>{cityName}</Link>
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>{districtName}</BreadcrumbPage>
			</BreadcrumbItem>
		</>
	);
}
