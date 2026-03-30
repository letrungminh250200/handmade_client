import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import AIStylist from "@/components/layout/AIStylist";
import { globalMetadata, createWebsiteJsonLd, JsonLdScript } from "@/lib/seo";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  display: 'swap',
});

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
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
        className={`${beVietnamPro.variable} ${lora.variable} font-sans antialiased`}
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

