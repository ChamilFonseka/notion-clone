import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Notion Clone",
  description: "This app is a clone of Notion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto
            scrollbar-hide">
              {children}
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
