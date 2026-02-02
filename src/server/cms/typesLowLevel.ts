import type { DistrictsInSameCity } from "@/server/cms/typesTableData";

interface TableCell {
	_type: "string"; // The type of the cell content, assuming it's always a string
	_key?: string; // An optional unique key for each cell
	content: string; // The actual content of the cell
}

interface TableRow {
	_type: "tableRow"; // The type identifier for the row
	_key: string; // A unique key for each row
	cells: TableCell[]; // An array of cells in the row
}

export interface TableType {
	_type: "table"; // The type identifier for the table
	_key: string; // A unique key for the table
	rows: TableRow[]; // An array of rows in the table
}

export interface Reference {
	_ref: string;
}

export interface CityReference {
	_id: string;
	gutachterInfo: GutachterInfo;
	gutachterInfoText: BlockContent;
	gutachterInfoText2: BlockContent;
	districtsOfCityText: BlockContent;
	districtsInSameCity: DistrictsInSameCity[];
	gutachterSlug: string;
	gutachterInfoContent: ContactDetailType;
	faqsList: Faq[];
	einwohner: number;
}
export interface Slug {
	_type: string;
	current: string;
}

export interface Rating {
	avgRating: number;
	count: number;
}

//TODO: this is Blog and BlockContent is actually an array of this :)

export interface Block {
	_key: string;
	_type: string;
	children?: Children[];
	markDefs?: any[];
	style?: string;
	asset?: AssetReference;
}

export interface BlockContent extends Array<Block> {}

export interface Children {
	_key: string;
	marks: any[];
	text: string;
	_type?: string;
	rows?: TableRow[];
}

export interface AssetReference {
	_ref: string;
	_type: "reference";
}

export interface Seo {
	title: string;
	metaDescription: string;
}

export interface SeowithPrio {
	title: string;
	metaDescription: string;
	priority?: number;
}

export interface AddSection {
	heading: string;
	text: BlockContent;
}

export interface Faq {
	question: string;
	answer: BlockContent;
}

export interface GutachterInfo {
	portal: string;
	adressLine1: string;
	adressLine2: string;
	adressLine3: string;
	website: string;
	mail: string;
	phone: string;
	fax: string;
	price: number;
}

export interface ContactDetailType {
	adressName: string;
	adressLine1: string;
	adressLine2: string;
	postalLine1: string;
	postalLine2: string;
	website: string;
	mail: string;
	phone: string;
	fax: string;
}

export interface OpeningTimePerDay {
	dayOfWeek: string;
	start: TimeOfDay;
	end: TimeOfDay;
	start_2: TimeOfDay;
	end_2: TimeOfDay;
	order: number;
}

export interface TimeOfDay {
	_type: "timeOfDay";
	time: string;
}

export interface RelatedCitiesReference {
	city: string;
	longSlug: string;
	reference: string;
}
