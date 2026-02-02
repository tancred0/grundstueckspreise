import Image from "next/image";
import Link from "next/link";
import brwLogo from "@/images/general/logo_small_white.svg";

export interface FooterLinks {
	name: string;
	slug: string;
	bold?: boolean;
	addMargin?: boolean;
}

interface LinkSection {
	heading: string;
	links: FooterLinks[];
}

const GeneralLinks: { sections: LinkSection[] }[] = [
	{
		sections: [
			{
				heading: "Immobilienpreise",
				links: [
					{ name: "Immobilienpreise Deutschland", slug: "/" },
					{ name: "Immobilienpreise NRW", slug: "/immobilienpreise/nrw" },
				],
			},
		],
	},

	{
		sections: [
			{
				heading: "Bodenrichtwerte",
				links: [
					{
						name: "Bodenrichtwerte Deutschland",
						slug: "https://www.bodenrichtwerte-deutschland.de/",
					},
					// { name: "Bodenrichtwerte Berlin", slug: "https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/berlin" },
					// { name: "Bodenrichtwerte Hamburg", slug: "https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/hamburg" },
					// { name: "Bodenrichtwerte Hessen", slug: "https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/hessen" },
					// { name: "Bodenrichtwerte NRW", slug: "https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/nrw" },
					// { name: "Bodenrichtwerte Baden-Württemberg", slug: "https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/bw" },
					// { name: "Bodenrichtwerte Brandenburg", slug: "https://www.bodenrichtwerte-deutschland.de/bodenrichtwert/brandenburg" },
				],
			},
		],
	},
];

export default function Footer({ classname }: { classname?: string }) {
	return (
		<footer className={`${classname ?? "mt-10"}`}>
			<div className="bg-blue-90 py-4">
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
				<div className="mx-auto grid max-w-[1200px] grid-cols-1 xs:grid-cols-2 px-10 md:grid-cols-3">
					{GeneralLinks.map((group, groupIndex) => (
						<div className="mb-8" key={groupIndex}>
							{group.sections.map((section, sectionIndex) => (
								<div className="mb-6" key={sectionIndex}>
									<h4>{section.heading}</h4>
									<div className="mx-auto grid grid-flow-row grid-cols-1 gap-y-2 sm:grid md:justify-start">
										{section.links.map((link, index) => (
											<Link
												className={`block truncate text-base no-underline ${
													link.bold ? "font-medium" : ""
												} ${link.addMargin ? "mb-4" : ""}`}
												href={link.slug}
												key={index}
											>
												{link.name}
											</Link>
										))}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			<div className="bg-zinc-100 py-2">
				<div className="mx-auto max-w-[1200px] px-10 pt-4 pb-2">
					<div className="grid grid-flow-col justify-between gap-x-10">
						<p className="mb-0 text-base">Copyright © 2026</p>
						<div className="flex flex-col gap-2 sm:flex-row">
							<p className="mb-0 text-base">All rights reserved.</p>
							<Link
								className="truncate text-base text-gray-600 no-underline"
								href="/impressum"
								target="_blank"
							>
								Impressum
							</Link>
							<Link
								className="truncate text-base text-gray-600 no-underline"
								href="/datenschutz"
								target="_blank"
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
