import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import brwLogo from "@/images/general/logo_small_white.svg";
import type { DistrictsInSameCity } from "@/server/cms/typesTableData";

export default function DynFooter({
	sameBezirkData,
	parentSlug,
	isSubdistricts = false,
	isSpecialState = false,
}: {
	sameBezirkData: DistrictsInSameCity[];
	parentSlug: string;
	isSubdistricts?: boolean;
	isSpecialState?: boolean;
}) {
	//TODO: should be sort by distance and not by most expensive one :D
	const sortedDistricts = sameBezirkData; //.sort((a, b) => b.median - a.median)
	const top16expensive = sortedDistricts.slice(
		0,
		Math.min(12, sortedDistricts.length),
	);

	return (
		<footer className="mt-10">
			<div className="bg-primary py-4">
				<div className="mx-auto max-w-[1200px] px-10">
					<div className="w-auto">
						<Link className="mr-auto" href="/">
							<Image
								alt="Logo Immobilienpreise Deutschland"
								className="mr-10"
								src={brwLogo}
							/>
						</Link>
					</div>
				</div>
			</div>
			<div className="py-2">
				<div className="mx-auto max-w-[1200px] px-10">
					<h4>
						{isSpecialState
							? "Bodenrichtwerte benachbarter Stadtteile"
							: isSubdistricts
								? "Bodenrichtwerte der Stadtteile"
								: "Bodenrichtwerte benachbarter Städte"}
					</h4>
					<div className="mx-auto mt-6 mb-8 grid grid-flow-row grid-cols-1 grid-rows-4 justify-between gap-y-2 md:grid-flow-col md:grid-cols-2 lg:grid-cols-3">
						{top16expensive.map((district, index) => (
							<Link
								className="block truncate text-base no-underline"
								href={
									isSubdistricts
										? `${parentSlug}/${district.slug.current}`
										: district.slug.current
								}
								key={index}
							>
								Bodenrichtwerte {district.district}
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="bg-zinc-100 py-2">
				<div className="mx-auto max-w-[1200px] px-10 pt-4 pb-2">
					<div className="grid grid-flow-col justify-between gap-x-10">
						<p className="mb-0 text-base">
							Copyright © {new Date().getFullYear()}
						</p>
						<div className="flex gap-2">
							<p className="mb-0 text-base">All rights reserved.</p>
							<Link
								className="text-base text-gray-600 no-underline"
								href="/impressum"
							>
								Impressum
							</Link>
							<Link
								className="text-base text-gray-600 no-underline"
								href="/datenschutz"
							>
								Datenschutz
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
