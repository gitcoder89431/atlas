import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { MusicToggle } from "@/components/music-toggle";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RUIXEN - The bridge between past wisdom and future intelligence",
  description: "Where history's greatest minds meet tomorrow's intelligence. Explore dialogues and insights from legendary thinkers through the lens of artificial intelligence.",
  keywords: ["AI", "artificial intelligence", "philosophy", "history", "dialogue", "wisdom", "computational thinking"],
  authors: [{ name: "Ruixen" }],
  creator: "Ruixen",
  publisher: "Ruixen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${chakraPetch.variable} antialiased`}>
        {children}
        <MusicToggle />
      </body>
    </html>
  );
}
