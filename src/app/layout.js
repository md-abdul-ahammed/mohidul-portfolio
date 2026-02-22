import { NeueMachina, neueMontreal } from "@/fonts/neueMontreal";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Footer/Footer";
import InitialLoader from "@/components/InitialLoader";
import LenisProvider from "@/components/LenisProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mohidul-portfolio-five.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohidul Islam – Expert UI/UX Designer for SaaS & Web Apps",
  description: "Helping startups and agencies create clean, high-performing digital products with thoughtful UX, clear interfaces, and measurable business impact.",
  icons: {
    icon: "/favicon.svg", // path from public/
  },
  openGraph: {
    title: "Mohidul Islam – Expert UI/UX Designer for SaaS & Web Apps",
    description: "Helping startups and agencies create clean, high-performing digital products with thoughtful UX, clear interfaces, and measurable business impact.",
    url: "https://www.mohidul.me/",
    siteName: "Mohidul",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/myImg/myImg.png",
        width: 1200,
        height: 630,
        alt: "Mohidul Islam – UI/UX Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohidul Islam – Expert UI/UX Designer for SaaS & Web Apps",
    description: "Helping startups and agencies create clean, high-performing digital products with thoughtful UX, clear interfaces, and measurable business impact.",
    images: ["/images/myImg/myImg.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${neueMontreal.variable} ${NeueMachina.variable} relative antialiased`}
        suppressHydrationWarning={true}
      >
        <InitialLoader />
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
