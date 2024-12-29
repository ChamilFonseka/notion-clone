import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
