import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FasterKart Tech | Digital Transformation & Software Development Agency",
  description:
    "We build modern websites, mobile apps, AI solutions, and enterprise software that transform businesses and accelerate digital growth.",
  keywords:
    "software development, web development, mobile app development, AI solutions, digital transformation, Next.js, React, MERN stack",
  openGraph: {
    title: "FasterKart Tech | Digital Transformation Agency",
    description:
      "We build modern websites, mobile apps, AI solutions & enterprise software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
