import Image from "next/image";
import Link from "next/link";
import brwLogo from "@/images/general/logo_small_white.svg";
import { cn } from "@/lib/utils";

export default function FooterLight({ className }: { className?: string }) {
	return (
		<footer className={cn("bg-blue-90 py-6", className)}>
			<div className="mx-auto max-w-[1200px] px-4 md:px-10">
				<div className="flex flex-col items-center gap-6 md:flex-row md:gap-4">
					<div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
						<nav className="flex gap-4 md:gap-6">
							<Link className="mb-4 md:mb-0" href="/">
								<Image
									alt="Logo Immobilienpreise Deutschland"
									className="h-8 w-auto md:h-10"
									src={brwLogo}
								/>
							</Link>

							<Link
								className="text-sm text-white transition-colors hover:text-gray-200 md:hidden md:text-base"
								href="/impressum"
							>
								Impressum
							</Link>
							<Link
								className="text-sm text-white transition-colors hover:text-gray-200 md:hidden md:text-base"
								href="/datenschutz"
							>
								Datenschutz
							</Link>
						</nav>
					</div>

					<div className="text-center text-white md:text-left">
						<span className="text-sm md:text-base">
							Copyright © {new Date().getFullYear()} - All rights reserved.
						</span>
					</div>

					<div className="flex flex-col items-center gap-4 md:ml-auto md:flex-row md:gap-8">
						<Link
							className="hidden text-sm text-white transition-colors hover:text-gray-200 md:block md:text-base"
							href="/impressum"
						>
							Impressum
						</Link>
						<Link
							className="hidden text-sm text-white transition-colors hover:text-gray-200 md:block md:text-base"
							href="/datenschutz"
						>
							Datenschutz
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
