import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import "./embla.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zoho en ASCG",
  description: "Zoho Books Partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
