import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SoundManager from "@/components/features/audio/SoundManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moode",
  description: "Aesthetic Focus Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <SoundManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
