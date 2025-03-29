'use client';  

import { QueryClient, QueryClientProvider } from 'react-query';  
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/Providers";
import "./globals.css";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
          <Navbar />
          <QueryClientProvider client={queryClient}>
            <Providers>
              {children}
            </Providers>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
