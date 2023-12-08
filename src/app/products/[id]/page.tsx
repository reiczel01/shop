import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { cache } from "react";
import AddToCartButton from "@/app/products/[id]/AddToCartButton";
import { Metadata } from "next";
import { incrementProductQuantity } from "./actions";

// Interfejs właściwości przekazywanych do komponentu ProductPage.
interface ProductPageProps {
  params: {
    id: string;
  };
}

// Funkcja getProduct używa cache do przechowywania produktu w pamięci podręcznej.
const getProduct = cache(async (id: string) => {
  // Pobieranie produktu z bazy danych Prisma.
  const product = await prisma.product.findUnique({
    where: { id },
  });

  // Jeśli produkt nie istnieje, generowana jest strona "notFound".
  if (!product) notFound();

  return product;
});

// Funkcja generateMetadata generuje metadane strony produktu.
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name, // Tytuł strony ustawiony na nazwę produktu.
    description: product.description, // Opis strony ustawiony na opis produktu.
    openGraph: {
      images: [{ url: product.imageUrl }], // Obraz strony ustawiony na obraz produktu.
    },
  };
}

// Komponent ProductPage wyświetla informacje o produkcie.
export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  // Pobieranie produktu z pamięci podręcznej.
  const product = await getProduct(id);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      {/* Wyświetlanie obrazu produktu za pomocą komponentu Image z Next.js */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg shadow-md"
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        {/* Wyświetlanie ceny produktu za pomocą komponentu PriceTag. */}
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        {/* Wyświetlanie przycisku "Dodaj do koszyka" za pomocą komponentu AddToCartButton. */}
        <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
      </div>
    </div>
  );
}
