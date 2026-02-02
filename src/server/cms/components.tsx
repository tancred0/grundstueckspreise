import type {
	PortableTextReactComponents,
	PortableTextTypeComponentProps,
} from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { createImageUrlBuilder } from "@sanity/image-url";
import { AlertTriangle, Check, Info, Lightbulb, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PiBookOpenText } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { Sanity } from "@/server/cms/Sanity";

const sanity = new Sanity();
const imageBuilder = createImageUrlBuilder(sanity.client);
export function imageUrl(source: string) {
	return `${imageBuilder.image(source).url()}?auto=format`;
}

type ChildrenProps = {
	children?: React.ReactNode;
	className?: string;
	asset?: {
		_ref?: string;
	};
};

const P = ({ children }: ChildrenProps) => {
	return <p>{children}</p>;
};

const Strong = ({ children }: ChildrenProps) => {
	return (
		<span className="font-semibold text-gray-600 text-xs">{children}</span>
	);
};

const BulletListItem = ({ children }: ChildrenProps) => <li>{children}</li>;

// Custom component for numbered list items
const NumberedListItem = ({ children }: ChildrenProps) => (
	<li style={{ listStyleType: "decimal" }}>{children}</li>
);

const InsideQuote = ({ children }: ChildrenProps) => (
	<div className="my-4 border-blue-90 border-l-4 py-3 pl-4 text-gray-600 text-xl">
		{children}
	</div>
);

const BlockQuote = ({ children }: ChildrenProps) => (
	<div className="my-4 border-blue-90 border-l-4 bg-blue-10 p-4 text-gray-600 text-xl">
		{children}
	</div>
);

const InfoBox: React.FC<PortableTextTypeComponentProps<any>> = ({
	value,
}: any) => {
	const colorSchema = {
		info: {
			icon: Info,
			bgColor: "bg-blue-10",
			borderColor: "border-blue-90",
			textColor: "text-blue-90",
		},
		warning: {
			icon: AlertTriangle,
			bgColor: "bg-red-50",
			borderColor: "border-red-500",
			textColor: "text-red-500",
		},
		tip: {
			icon: Lightbulb,
			bgColor: "bg-gray-50",
			borderColor: "border-green-500",
			textColor: "text-green-500",
		},
	} as const;

	const schema =
		colorSchema[value.type as keyof typeof colorSchema] ?? colorSchema.info;
	const Icon = schema.icon;
	return (
		<div
			className={cn(
				"mt-6 mb-6 rounded-2xl border-l-4 px-8 py-4",
				schema.bgColor,
				schema.borderColor,
			)}
		>
			<div
				className={cn(
					"mt-2 mb-4 flex w-full gap-x-2 border-b pb-4",
					schema.borderColor,
				)}
			>
				<Icon className={cn("h-6 w-6", schema.textColor)} />
				<div className={cn("m-0 font-semibold text-xl", schema.textColor)}>
					{value.heading}
				</div>
			</div>
			<PortableTextRenderer input={value.text} />
		</div>
	);
};

const ImageComponent: React.FC<PortableTextTypeComponentProps<any>> = ({
	value,
}: any) => {
	return (
		<div className="relative mx-auto mt-4 mb-8 aspect-video w-full">
			<Image
				alt="Alt Text"
				className="rounded-2xl object-cover"
				fill
				sizes="(max-width: 768px) 100vw, 800px"
				src={imageUrl(value)}
			/>
		</div>
	);
};

const ImageComponentWithDetails: React.FC<
	PortableTextTypeComponentProps<any>
> = ({ value }: any) => {
	let displayDomain = "";
	if (value.link) {
		try {
			displayDomain = new URL(value.link).hostname;
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="relative mx-auto mt-4 mb-4 aspect-video w-full">
				<Image
					alt={value.altText || "Image"}
					className="rounded-2xl object-cover"
					fill
					sizes="(max-width: 768px) 100vw, 800px"
					src={imageUrl(value.image)}
				/>
			</div>
			{displayDomain && (
				<div className="mb-4 truncate text-lg">
					Quelle:{" "}
					<Link className="truncate text-lg" href={value.link} target="_blank">
						{displayDomain}
					</Link>
				</div>
			)}
		</>
	);
};

const Table: React.FC<PortableTextTypeComponentProps<any>> = ({
	value,
}: any) => {
	return (
		<div className="table-container">
			<table className="table">
				<thead>
					<tr className="header-row">
						{/* @ts-expect-error */}
						{value.rows[0].cells.map((cell, index) => (
							<th className="th" key={cell._key || index}>
								{cell}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* @ts-expect-error */}
					{value.rows.slice(1).map((row, index) => (
						<tr className="tr" key={row._key || index}>
							{/* @ts-expect-error */}
							{row.cells.map((cell, cellIndex) => (
								<td className="td" key={cell._key || cellIndex}>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const CheckListItem = ({ children, type, withIcon = true }: any) => {
	const isPro = type === "pro";
	return (
		<li className={cn("ml-0 flex items-start", { "gap-3": withIcon })}>
			{withIcon ? (
				isPro ? (
					<Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
				) : (
					<X className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
				)
			) : (
				<span className="inline-block h-5 w-5">{"•"}</span>
			)}
			<span className="text-gray-700 leading-relaxed">{children}</span>
		</li>
	);
};

const ProConList: React.FC<PortableTextTypeComponentProps<any>> = ({
	value,
}: any) => {
	const withIcon = value.type === "checkmarks";

	return (
		<div className="my-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
			{/* Unified layout that works for both desktop and mobile */}
			<div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
				{/* Pros column */}
				<div className="p-6 md:p-8">
					<h4 className="md:mb-6">{value.titlePro}</h4>
					<ul
						className="space-y-4"
						style={{ listStyleType: withIcon ? "none" : "disc" }}
					>
						{value.pros.map((pro: string, index: number) => (
							<CheckListItem key={index} type="pro" withIcon={withIcon}>
								{pro}
							</CheckListItem>
						))}
					</ul>
				</div>

				{/* Cons column */}
				<div className="bg-red p-6 md:p-8">
					<h4 className="md:mb-6">{value.titleCon}</h4>
					<ul
						className="space-y-4"
						style={{ listStyleType: withIcon ? "none" : "disc" }}
					>
						{value.cons.map((con: string, index: number) => (
							<CheckListItem key={index} type="con" withIcon={withIcon}>
								{con}
							</CheckListItem>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

const Definition: React.FC<PortableTextTypeComponentProps<any>> = ({
	value,
}: any) => {
	return (
		<div
			className={cn(
				"mt-6 mb-6 rounded-2xl border-4 border-blue-90 bg-blue-10 px-8 py-4",
			)}
		>
			<dl className={cn("mt-2 mb-4 flex w-full items-center gap-x-2 pb-4")}>
				<PiBookOpenText className={cn("h-12 w-12", "text-blue-90")} />
				<dt className="font-semibold text-2xl text-primary">{value.heading}</dt>
			</dl>
			<dd>
				<PortableTextRenderer input={value.text} />
			</dd>
		</div>
	);
};

const DetailedList: React.FC<PortableTextTypeComponentProps<any>> = ({
	value,
}: any) => {
	// value has type = "numbered" or "bullet" or "step-by-step" or "checkmarks"
	// item.heading -> string
	// item.content -> blockContent

	switch (value.type) {
		case "numbered":
			return (
				<div>
					<ol>
						{value.items.map((item: any, index: number) => (
							<li key={index} style={{ listStyleType: "decimal" }}>
								<h4>{item.heading}</h4>
								<PortableText value={item.content} />
							</li>
						))}
					</ol>
				</div>
			);
		case "step-by-step":
			return (
				<div className="my-4 rounded-2xl bg-blue-10 p-8 pb-6">
					<ol className="m-0 list-none space-y-8 p-0">
						{value.items.map((item: any, index: number) => (
							<li className="ml-0 flex gap-4" key={index}>
								<div className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-primary text-sm text-white">
									{index + 1}
								</div>
								<div>
									<h4 className="mt-0 font-semibold text-primary text-xl">
										{item.heading}
									</h4>
									<PortableTextRenderer input={item.content} />
								</div>
							</li>
						))}
					</ol>
				</div>
			);
		case "checkmarks":
			return (
				<ol className="list-none space-y-8">
					{value.items.map((item: any, index: number) => (
						<li className="ml-0 flex gap-4" key={index}>
							<Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" />
							<div>
								<h4 className="mt-0 font-semibold text-primary text-xl">
									{item.heading}
								</h4>
								<PortableTextRenderer input={item.content} />
							</div>
						</li>
					))}
				</ol>
			);
		default: // "bullet":
			return (
				<div>
					<ul className="list-disc pl-5">
						{value.items.map((item: any, index: number) => (
							<li key={index}>
								<h4>{item.heading}</h4>
								<PortableText value={item.content} />
							</li>
						))}
					</ul>
				</div>
			);
	}
};

const SimpleList: React.FC<PortableTextTypeComponentProps<any>> = ({
	value,
}: any) => {
	// value has type = "numbered" or "bullet" or "step-by-step" or "checkmarks"
	// item.content -> blockContent

	switch (value.type) {
		case "numbered":
			return (
				<div>
					<ol>
						{value.items.map((item: any, index: number) => (
							<li key={index} style={{ listStyleType: "decimal" }}>
								<PortableText value={item.content} />
							</li>
						))}
					</ol>
				</div>
			);
		case "step-by-step":
			return (
				<ol className="m-0 list-none space-y-8 p-0">
					{value.items.map((item: any, index: number) => (
						<li className="ml-0 flex gap-4" key={index}>
							<div className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-primary text-sm text-white">
								{index + 1}
							</div>
							<div>
								<PortableTextRenderer input={item.content} />
							</div>
						</li>
					))}
				</ol>
			);
		case "checkmarks":
			return (
				<ol className="list-none">
					{value.items.map((item: any, index: number) => (
						<li className="mb-0 ml-0 flex gap-4" key={index}>
							<Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary" />
							<div>
								<PortableTextRenderer input={item.content} />
							</div>
						</li>
					))}
				</ol>
			);
		default: // "bullet":
			return (
				<div>
					<ul className="list-disc pl-5">
						{value.items.map((item: any, index: number) => (
							<li key={index}>
								<PortableText value={item.content} />
							</li>
						))}
					</ul>
				</div>
			);
	}
};

const Formula: React.FC<PortableTextTypeComponentProps<any>> = ({
	value,
}: any) => {
	return (
		<div className="mt-6 mb-6 rounded-2xl bg-gray-50 px-8 py-4">
			<h3>Formel</h3>
			<div className="space-y-6">
				<div className="rounded-xl border border-gray-200 bg-white p-6 font-mono text-lg">
					{value.formula}
				</div>

				<div className="space-y-4">
					{value.explanation.map((item: any, index: number) => (
						<ol className="text-lg" key={index}>
							<li>
								<span className="font-semibold text-primary">
									{item.title}:{" "}
								</span>
								<span className="text-gray-700">{item.description}</span>
							</li>
						</ol>
					))}
				</div>

				{value.examples && (
					<div className="mt-6 border-t pt-4">
						<div className="text-gray-700">
							<PortableText value={value.examples} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export const sanityPortableTextComponents: Partial<PortableTextReactComponents> =
	{
		block: {
			normal: P,
			strong: Strong,
			blockquote: BlockQuote,
			insidequote: InsideQuote,
		},
		listItem: {
			bullet: BulletListItem,
			number: NumberedListItem,
		},
		types: {
			image: ImageComponent,
			imageWithDetails: ImageComponentWithDetails,
			infoBox: InfoBox,
			table: Table,
			formula: Formula,
			simpleList: SimpleList,
			detailedList: DetailedList,
			proConList: ProConList,
			definition: Definition,
		},
	};

export const PortableTextRenderer = ({
	input,
	className,
}: {
	input: any;
	className?: string;
}) => {
	return (
		<div className={className}>
			<PortableText components={sanityPortableTextComponents} value={input} />
		</div>
	);
};

const summary = ({ children }: ChildrenProps) => {
	return (
		<p className="mb-4 text-gray-600 leading-[28px] md:text-xl">{children}</p>
	);
};

const summaryBulletListItem = ({ children }: ChildrenProps) => (
	<li>{children}</li>
);

const summaryTextComponents: Partial<PortableTextReactComponents> = {
	block: {
		normal: summary,
	},
	listItem: {
		bullet: summaryBulletListItem,
	},
};

export const SummaryTextRender = ({ input }: { input: any }) => {
	return <PortableText components={summaryTextComponents} value={input} />;
};

export const PortableBlogRenderer = ({ input }: { input: any }) => {
	let h2Counter = 1;

	const customComponents = {
		...sanityPortableTextComponents,
		block: {
			...sanityPortableTextComponents.block,
			h2: (props: any) => {
				const id = `sec${h2Counter}`;
				h2Counter += 1;
				return <h2 id={id}>{props.children}</h2>;
			},
		},
	} as Partial<PortableTextReactComponents>;

	return <PortableText components={customComponents} value={input} />;
};
