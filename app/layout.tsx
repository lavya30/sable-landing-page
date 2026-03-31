import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sable-app.tech"),
  title: "Sable — Write with Intention",
  description:
    "Sable is a beautiful, local-first writing app that keeps your words private, your focus sharp, and your creativity flowing.",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "Sable — Write with Intention",
    description: "A beautiful, local-first writing app.",
    siteName: "Sable",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 1200,
        alt: "Sable App Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sable — Write with Intention",
    description: "A beautiful, local-first writing app.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body>{children}</body>
    </html>
  );
}
