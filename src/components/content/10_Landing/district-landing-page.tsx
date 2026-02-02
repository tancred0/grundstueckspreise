/* eslint-disable @typescript-eslint/no-explicit-any */
interface DistrictLandingPageProps {
	data: any;
	districts?: any[];
	isCity?: boolean;
}

export default function DistrictLandingPage({
	data,
	districts,
	isCity,
}: DistrictLandingPageProps) {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-4">
				Bodenrichtwert {data.cityName}
				{data.districtName && ` - ${data.districtName}`}
			</h1>
			{districts && districts.length > 0 && (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{districts.map((district: any, index: number) => {
						const displayName = district.districtName || district.name || `District ${index + 1}`;
						return (
							<div key={displayName} className="p-4 border rounded-lg">
								<h3 className="font-semibold">{displayName}</h3>
								<p className="text-muted-foreground">
									Durchschnitt: {district.avg} €/m²
								</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
