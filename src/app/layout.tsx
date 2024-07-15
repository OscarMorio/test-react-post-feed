import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Providers from "@/components/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prueba técnica",
  description: "Prueba técnica realizada para Idrica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="page-wrapper">
          <Providers>
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
