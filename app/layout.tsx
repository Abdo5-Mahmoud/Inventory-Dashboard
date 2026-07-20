import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "DashCommerce",
    template: "%s | DashCommerce",
  },
  description:
    "Monitor business metrics, orders, revenue and inventory in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={cn(
          "bg-background",
          "h-screen",
          "flex",
          "flex-col",
          "overflow-hidden",
        )}
      >
        {children}
      </body>
    </html>
  );
}
