import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PulseAI — SaaS Analytics Dashboard",
  description: "Monitor your business performance with real-time analytics and insights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={[inter.className, "antialiased bg-[#0d0c18] text-slate-100"].join(" ")}>
        {children}
      </body>
    </html>
  );
}
