import { Home } from "lucide-react";
import Link from "next/link";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadCrumbsBlog({ title }: { title?: string }) {
	return (
		<Breadcrumb className="mb-4">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link className="flex items-center gap-x-1" href="/">
							<Home className="size-4" />
							<span className="hidden md:inline">Bodenrichtwerte</span>
							<span className="md:hidden">BRW</span>
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{title === undefined ? (
					<BreadcrumbItem>
						<BreadcrumbPage>Immobilienwissen</BreadcrumbPage>
					</BreadcrumbItem>
				) : (
					<>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/immobilienwissen">Immobilienwissen</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{title}</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
