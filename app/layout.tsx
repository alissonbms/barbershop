import { SessionProvider } from "next-auth/react";

import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "./_components/ui/sonner";
import Footer from "./_components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Davies Barber",
  description: "Best barbers platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col">
          <SessionProvider>
            <div className="flex-1">{children}</div>
            <Footer />
          </SessionProvider>
          <Toaster position="bottom-center" />
        </div>
      </body>
    </html>
  );
}
