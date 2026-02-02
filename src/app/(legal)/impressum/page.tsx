import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import impressumImg1 from "@/images/impressum/impressum1.png";
import impressumImg2 from "@/images/impressum/impressum2.png";

export default async function Page() {
	return (
		<>
			<meta content="noindex" name="robots"></meta>
			<main className="main-container">
				<h1>Impressum</h1>
				<p className="mt-6">
					www.immobilienpreise-deutschland.com ist ein Service der HLRE GmbH
				</p>
				<h2>Adresse</h2>
				<Image alt="Impressum" height={100} src={impressumImg1} />
				{/* <p className="mb-0">HH ADVISORY UG</p>
                    <p className="mb-0">Sredzkistr. 41</p>
                    <p className="mb-0">10435 Berlin</p> */}
				<h2>Kontakt</h2>
				<Link
					className="mb-4"
					href="mailto:info@bodenrichtwerte-deutschland.de"
				>
					info@bodenrichtwerte-deutschland.de
				</Link>
				<p className="text-white">.</p>
				{/* <p className="mb-0"><strong>Geschäftsführer:</strong> Hanno Heintzenberg</p>
                    <p className="mb-0"><strong>Handelsregister:</strong> Amtsgericht Charlottenburg (Berlin)</p>
                    <p><strong>Registernummer:</strong> HRB 213949 B</p>
                    <p className="mb-0">Verantwortlicher für journalistisch-redaktionelle Inhalte</p>
                    <p>gem. § 55 II RstV & § 5 TMG: Hanno Heintzenberg</p> */}
				<Image
					alt="Impressum"
					className="ml-[10px]"
					height={200}
					src={impressumImg2}
				/>
				<h2>Rechtshinweis</h2>
				<p>
					Alle Rechte vorbehalten, soweit nicht ausdrücklich etwas anderes
					angegeben wird. Alle Inhalte vermitteln lediglich einen
					unverbindlichen Überblick über die HLRE GmbH. Für die Richtigkeit,
					Vollständigkeit oder Aktualität der Daten wird keine Gewähr
					übernommen. Die betrifft auch die Hyperlinks. Änderungen oder
					Ergänzungen erfolgen ohne vorherige Ankündigung.
				</p>
			</main>
			<Footer />
		</>
	);
}
