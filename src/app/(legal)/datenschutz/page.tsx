import { cache } from "react";
import LegalBlogSection from "@/components/content/0_Blog/legal-blog-section";

import Footer from "@/components/layout/Footer";
import { Sanity } from "@/server/cms/Sanity";

const fetchData = cache(async () => {
  const sanity = new Sanity();
  const data = sanity.getBlogPost("datenschutz-immopreise-2026");
  return data;
});

export default async function Page() {
  const data = await fetchData();

  return (
    <>
      <meta content="noindex" name="robots" />
      <LegalBlogSection data={data} />
    </>
  );
}
