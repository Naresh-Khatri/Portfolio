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

export const metadata: Metadata = {
  title: "Naresh Khatri",
  description: "Portfolio",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

// const calSans = LocalFont({
//   src: "../public/fonts/CalSans-SemiBold.ttf",
//   variable: "--font-calsans",
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[archivoBlack.className].join(" ")}>
      <head>{/* <Analytics /> */}</head>
      <body>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <TooltipProvider>
            <Header />
            {children}
            <Footer />
          </TooltipProvider>
          <Toaster />
          <ElasticCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
