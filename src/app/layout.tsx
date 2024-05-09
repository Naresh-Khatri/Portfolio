import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import ElasticCursor from "@/components/ui/ElasticCursor";
import Particles from "@/components/Particles";

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
      <body
        className={`${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        } overflow-x-hidden`}
      >
        <Header />
        <ElasticCursor />
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <main style={{ marginTop: "60px", height: "calc(100dvh - 60px)" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
