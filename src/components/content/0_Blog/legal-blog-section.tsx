/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableTextRenderer } from "@/server/cms/components";



export default function LegalBlogSection({ data }: any) {
  return (
    <main className="main-container mt-6 md:mt-10 mx-auto">
        <section className="prose prose-slate max-w-none">
          {data.blogContent && <PortableTextRenderer input={data.blogContent} />}
        </section>
    </main>

  );
}
