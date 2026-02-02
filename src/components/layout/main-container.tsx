import { cn } from "@/lib/utils";

export function MainContainer({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<div className={cn("main-container", className)} {...props}>
			{children}
		</div>
	);
}
