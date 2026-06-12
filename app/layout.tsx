import '@/app/ui/global.css';
import { inter, playfair } from '@/app/ui/fonts';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven'
  },
  description: "Team-The Greatest's team project for WDD430.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen">
      <body className={`${inter.className} min-h-full overflow-y-auto antialiased`}>{children}</body>
    </html>
  );
}