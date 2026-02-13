import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/navigation/site-header";
import UTMTracker from "@/components/tracking/UTMTracker";
import { FirstPageTracker } from "@/components/tracking/FirstPageTracker";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Grundstückspreise Deutschland 2026",
  description: "Aktuelle Grundstückspreise in Deutschland 2026 ✓ Bodenrichtwerte ✓ Marktdaten",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <GoogleTagManager gtmId="GTM-WMTC6K4G" />
        {/* <Script
          src="/rs.js"
          strategy="afterInteractive"
          type="text/javascript"
        /> */}
        <FirstPageTracker />
        <UTMTracker />
        <SiteHeader />
        <main>{children}</main>

      </body>
    </html>
  );
}
