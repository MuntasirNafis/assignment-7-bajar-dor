import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "বাজার দর - নিত্যপ্রয়োজনীয় পণ্যের দাম",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${inter.className} min-h-screen flex flex-col justify-between bg-gray-50/50`}>
        <div>
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}