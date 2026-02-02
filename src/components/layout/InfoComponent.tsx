import Image, { type StaticImageData } from "next/image";
import calendarIcon from "@/images/textinfo/calendar.svg";
import clockIcon from "@/images/textinfo/clock.svg";
import starIcon from "@/images/textinfo/star.svg";
import { cn } from "@/lib/utils";
import lastTuesday from "@/lib/utils/lastTuesday";
import type { Rating } from "@/server/cms/typesLowLevel";

export default function InfoComponent({
	rating,
	readingTime,
}: {
	rating: Rating;
	readingTime?: number;
}) {
	const lastTuesdayFormatted = lastTuesday();
	const showedReadingTime = readingTime ?? 10;

	return (
		<div className="my-4 flex border-y-2 py-4 text-primary text-xs sm:mx-2 sm:text-base">
			<InfoItem
				alt="Clock"
				icon={clockIcon}
				label="Lesezeit:"
				value={`${showedReadingTime} min.`}
			/>
			<InfoItem
				alt="Calendar"
				icon={calendarIcon}
				label="Letzte Änderung:"
				value={lastTuesdayFormatted}
			/>
			<InfoItem
				alt="Star"
				icon={starIcon}
				label=""
				skipRightBorder={true}
				value={
					<>
						<strong>{rating == null ? 4.8 : rating.avgRating}</strong> bei{" "}
						<strong>{rating == null ? 47 : rating.count}</strong> Bewertungen
					</>
				}
				valueSmallScreen={
					<>
						<strong>{rating == null ? 4.8 : rating.avgRating}</strong> (
						{rating == null ? 47 : rating.count})
					</>
				}
			/>
		</div>
	);
}

function InfoItem({
	icon,
	alt,
	label,
	value,
	valueSmallScreen,
	skipRightBorder,
}: {
	icon: StaticImageData;
	alt: string;
	label: React.ReactNode;
	value: React.ReactNode;
	valueSmallScreen?: React.ReactNode;
	skipRightBorder?: boolean;
}) {
	return (
		<div className={cn("info-component", skipRightBorder ? "" : "border-r-2")}>
			<Image alt={alt} height={24} src={icon} width={24} />
			<div>
				<span className="hidden md:block">{label}</span>
				{valueSmallScreen ? (
					<>
						<div className="block md:hidden">{valueSmallScreen}</div>
						<div className="hidden md:block">{value}</div>
					</>
				) : (
					<div>{value}</div>
				)}
			</div>
		</div>
	);
}
