import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'PharmaCare - ร้านขายยาออนไลน์',
  description: 'บริการสั่งซื้อยาและเวชภัณฑ์ออนไลน์',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={geistSans.className}>
        <div className="min-h-screen bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}
