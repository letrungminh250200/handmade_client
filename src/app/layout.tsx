import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/layout/CartSidebar";
import AIStylist from "@/components/layout/AIStylist";

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

export const metadata: Metadata = {
  title: "Minh Thư Handmade - Thời Trang Thủ Công",
  description: "Cửa hàng thời trang handmade trực tuyến Minh Thư. Phong cách tối giản, tự nhiên. Tích hợp trợ lý ảo AI tư vấn phối đồ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
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
            <AIStylist />
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
