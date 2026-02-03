import Image from "next/image";
import ContractIcon from "@/images/funnel/trust/contract_mui.svg";
import FolderIcon from "@/images/funnel/trust/folder_mui.svg";
import ShieldIcon from "@/images/funnel/trust/shield_mui.svg";
import brwLogo from "@/images/general/logo_short_black_font.svg";

const TRUST_ICONS = [
	{
		icon: ContractIcon,
		text: "Amtliche Datenbasis",
		alt: "Contract",
	},
	{
		icon: FolderIcon,
		text: "DSGVO-konform",
		alt: "Folder",
	},
	{
		icon: ShieldIcon,
		text: "SSL-verschlüsselt",
		alt: "Shield",
	},
];

export function Trust() {
	return (
		<div className="flex flex-row items-center justify-center gap-6 md:gap-10">
			{TRUST_ICONS.map((icon) => (
				<div className="flex items-center gap-2 md:gap-3" key={icon.alt}>
					<Image
						alt={icon.alt}
						className="h-5 w-5 md:h-6 md:w-6"
						height={24}
						src={icon.icon}
						width={24}
					/>
					<span className="hyphens-none font-medium text-primary text-xs md:text-sm">
						{icon.text}
					</span>
				</div>
			))}
		</div>
	);
}

export function TrustWithIcon() {
	return (
		<div className="flex flex-row flex-wrap items-center justify-center gap-4">
			<Image
				alt="Logo Bodenrichtwerte Deutschland"
				className="h-6 w-auto"
				height={24}
				src={brwLogo}
				width={100}
			/>
			{TRUST_ICONS.map((icon) => (
				<div className="flex items-center gap-1.5" key={icon.alt}>
					<Image
						alt={icon.alt}
						className="h-4 w-4 shrink-0"
						height={16}
						src={icon.icon}
						width={16}
					/>
					<span className="hyphens-none font-medium text-xs text-primary whitespace-nowrap">
						{icon.text}
					</span>
				</div>
			))}
		</div>
	);
}
