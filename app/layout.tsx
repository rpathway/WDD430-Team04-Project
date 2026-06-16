import '@/app/ui/global.css';
import { inter, playfair } from '@/app/ui/fonts';
import type { Metadata } from "next";
import Header from '@/app/ui/header';
import Footer from '@/app/ui/footer';


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
      <body className={`${inter.className} min-h-full overflow-y-auto antialiased`}>

        <div className="min-h-screen bg-cream-white">
          <Header />

          {children}

          <Footer />
        </div>

      </body>
    </html>
  );
}