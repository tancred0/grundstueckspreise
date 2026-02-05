import { cache } from "react";
import LegalBlogSection from "@/components/content/0_Blog/legal-blog-section";

import Footer from "@/components/layout/Footer";
import { Sanity } from "@/server/cms/Sanity";

const fetchData = cache(() => {
	const sanity = new Sanity();
	const data = sanity.getBlogPost("agb-immopreise-206");
	return data;
});

export default async function Page() {
	const data = await fetchData();

	return (
		<>
			<meta content="noindex" name="robots" />
			<main className="main-container">
				<LegalBlogSection data={data} />
			</main>
			<Footer />
		</>
	);
}
