import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://moode-six.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Moode | Aesthetic Focus Timer & Ambient Sounds",
    template: "Moode | %s",
  },
  description:
    "Boost productivity with Moode. A minimalist Pomodoro timer mixed with ambient sounds (Rain, Cafe, Fire) to help you enter the flow state.",
  keywords: [
    "focus timer",
    "pomodoro timer",
    "ambient sounds",
    "productivity app",
    "study timer",
    "lofi study",
    "deep work",
    "online timer",
  ],
  authors: [{ name: "Wahyu Aji", url: "https://github.com/Whyawww" }],
  creator: "Wahyu Aji",
  openGraph: {
    title: "Moode - Focus Shouldn't Be Boring",
    description:
      "Enter flow state with ambient sounds and a distraction-free timer.",
    url: BASE_URL,
    siteName: "Moode",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
