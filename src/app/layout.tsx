import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL('https://fasterkart.tech'),
  title: "FasterKart Tech | Digital Transformation & Software Development Agency",
  description:
    "We build modern websites, mobile apps, AI solutions, and enterprise software that transform businesses and accelerate digital growth.",
  keywords:
    "software development, web development, mobile app development, AI solutions, digital transformation, Next.js, React, MERN stack",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "FasterKart Tech | Digital Transformation Agency",
    description:
      "We build modern websites, mobile apps, AI solutions & enterprise software.",
    url: "/",
    siteName: "FasterKart Tech",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={dark}>
      <html lang="en">
        <body>
          <ScrollReveal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
