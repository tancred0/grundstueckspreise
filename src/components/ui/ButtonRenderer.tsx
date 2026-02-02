import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export interface ButtonRendererProps {
	children?: ReactNode;
	text?: string;
	onClick?: () => void;
	variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
	size?: "default" | "sm" | "lg" | "icon";
	className?: string;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

export default function ButtonRenderer({
	children,
	text,
	onClick,
	variant = "default",
	size = "default",
	className,
	disabled,
	type = "button",
}: ButtonRendererProps) {
	return (
		<Button
			className={className}
			disabled={disabled}
			onClick={onClick}
			size={size}
			type={type}
			variant={variant}
		>
			{text ?? children}
		</Button>
	);
}
