import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import ElasticCursor from "@/components/ui/ElasticCursor";
import Particles from "@/components/Particles";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import Preloader from "@/components/preloader";
import EasterEggs from "@/components/easter-eggs";

export const metadata: Metadata = {
  title: "Naresh Khatri | Full-Stack Developer",
  description:
    "Explore the portfolio of Naresh, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work, including Coding Ducks, The Booking Desk, Ghostchat, and more. Let's build something amazing together!",
  keywords: [
    "Naresh",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "Coding Ducks",
    "The Booking Desk",
    "Ghostchat",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  authors: [{ name: "Naresh" }],
  openGraph: {
    title: "Naresh's Portfolio | Full-Stack Developer",
    description:
      "Discover the portfolio of Naresh, a full-stack developer creating interactive web experiences and innovative projects.",
    url: "https://nareshkhatri.site",
    images: [
      {
        url: "/assets/seo/og-image.png",
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naresh's Portfolio | Full-Stack Developer",
    description:
      "Explore Naresh's portfolio of interactive web experiences and innovative projects.",
    images: ["/assets/seo/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[archivoBlack.className].join(" ")}>
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1860832e-b813-4ad1-8393-e3ab52c86936"
        ></Script>
        {/* <Analytics /> */}
      </head>
      <body>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <Preloader>
            <TooltipProvider>
              <Header />
              {children}
              <Footer />
            </TooltipProvider>
            <Toaster />
            <EasterEggs />
            <ElasticCursor />
          </Preloader>
        </ThemeProvider>
      </body>
    </html>
  );
}
