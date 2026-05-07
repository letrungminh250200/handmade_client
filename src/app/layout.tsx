import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import AIStylist from "@/components/layout/AIStylist";
import { globalMetadata, createWebsiteJsonLd, JsonLdScript } from "@/lib/seo";

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin", "vietnamese"],
  variable: "--font-dm-sans",
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = globalMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = createWebsiteJsonLd();

  return (
    <html lang="vi">
      <head>
        <JsonLdScript data={websiteJsonLd} />
      </head>
      <body
        className={`${dmSans.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <CartProvider>
          <div className="noise-overlay" />
          <div className="flex flex-col min-h-screen bg-stone-50 text-stone-800">
            <Navbar />
            <CartSidebar />
            <main className="flex-grow">
              {children}
            </main>
            {/* <AIStylist /> */}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

