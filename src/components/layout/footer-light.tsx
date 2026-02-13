import Image from "next/image";
import Link from "next/link";
import brwLogo from "@/images/general/logo_short_white_font.svg";
import { cn } from "@/lib/utils";

export default function FooterLight({ className }: { className?: string }) {
	return (
		<footer className={cn("bg-primary py-6", className)}>
			<div className="mx-auto max-w-[1200px] px-4 md:px-10">
				<div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
					<div className="flex items-center gap-4">
						<Link href="/">
							<Image
								alt="Logo Grundstückspreise Deutschland"
								className="h-8 w-auto md:h-10"
								src={brwLogo}
							/>
						</Link>
						<span className="text-sm text-gray-300">
							© {new Date().getFullYear()} Alle Rechte vorbehalten.
						</span>
					</div>

					<div className="flex gap-6">
						<Link
							className="text-sm text-gray-300 hover:text-white transition-colors"
							href="/impressum"
						>
							Impressum
						</Link>
						<Link
							className="text-sm text-gray-300 hover:text-white transition-colors"
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
