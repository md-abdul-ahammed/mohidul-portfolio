import { NeueMachina, neueMontreal } from "@/fonts/neueMontreal";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Footer/Footer";
import InitialLoader from "@/components/InitialLoader";

export const metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohidul Islam – Expert UI/UX Designer for SaaS & Web Apps",
    description: "Helping startups and agencies create clean, high-performing digital products with thoughtful UX, clear interfaces, and measurable business impact.",
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

        {/* 🚀 Smooth Scroll Wrapper */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
