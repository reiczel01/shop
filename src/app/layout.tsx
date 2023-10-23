import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Importowanie globalnych stylów CSS.
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import SessionProvider from "./SessionProvider"

// Inicjalizacja czcionki Inter z określonym podzbiorem "latin".
const inter = Inter({ subsets: ["latin"] });

// Metadane strony, takie jak tytuł i opis.
export const metadata: Metadata = {
  title: "Shopla",
  description: "Super sklep internetowy",
};

// Komponent RootLayout, który definiuje podstawową strukturę strony.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Dzieci komponentu, które zostaną umieszczone w głównym obszarze strony.
}) {
  return (
    <html lang="en"> {/* Definicja języka strony. */}
      <body className={inter.className}> {/* Ustawienie czcionki Inter na stronie. */}
      <SessionProvider>
      <Navbar />
        <main className="p-4 max-w-[80%] m-auto min-w-[300px]">
          {children} {/* Wstawienie zawartości przekazanej do komponentu. */}
        </main>
        <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
