import { cn } from "@/lib/utils";

interface PercentageChangeProps {
	value: number | undefined | null;
	className?: string;
}

export function PercentageChange({
	value,
	className,
}: PercentageChangeProps) {
	if (value == null) {
		return <span className={cn("font-medium text-muted-foreground", className)}>–</span>;
	}

	const isPositive = value > 0;
	const isNegative = value < 0;

	return (
		<span
			className={cn(
				"font-medium",
				isPositive && "text-green-600",
				isNegative && "text-red-600",
				!isPositive && !isNegative && "text-muted-foreground",
				className,
			)}
		>
			{isPositive && "+"}
			{value.toFixed(1)}%
		</span>
	);
}

export default PercentageChange;
