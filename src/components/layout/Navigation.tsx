// "use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import brwLogo from "@/images/general/logo_small.svg";
import { CTANavBar } from "../sections/general/CTA";

export default function Navigation() {
	// const pathname = usePathname();
	// const pathParts = pathname.split("/").filter(Boolean);
	// const isBayern = pathParts[1] === "bayern";
	const isBayern = false;

	return (
		<header className="sticky top-0 z-50 mb-14 bg-slate-50 py-2 shadow-md">
			<div className="mx-auto max-w-[1200px] px-10">
				<nav className="flex">
					<div className="w-auto">
						<Link href="/">
							<Image
								alt="Logo Immobilienpreise Deutschland"
								className="mr-10"
								src={brwLogo}
							/>
						</Link>
					</div>
					<div className="my-auto ml-auto flex flex-row gap-x-4">
						{isBayern && (
							<div className="my-auto">
								<Link
									className="text-blue-90 no-underline"
									href={"/immobilienwissen"}
								>
									<span className="text-base sm:hidden">Wissen</span>
									<span className="hidden text-base sm:block">
										Immobilienwissen
									</span>
								</Link>
							</div>
						)}
						{!isBayern && (
							<>
								<div className="my-auto hidden md:block">
									<Link
										className="text-blue-90 no-underline"
										href={
											"https://www.immobilienpreise-deutschland.com/immobilienwissen"
										}
									>
										<span className="text-base sm:hidden">Wissen</span>
										<span className="hidden text-base sm:block">
											Immobilienwissen
										</span>
									</Link>
								</div>
								<CTANavBar
									className="ml-auto"
									cta="Bodenrichtwert anfragen"
									href="https://www.immobilienpreise-deutschland.com/bewertung"
								/>
							</>
						)}
					</div>
				</nav>
			</div>
		</header>
	);
}
