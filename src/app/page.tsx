import Image from "next/image";
import prisma from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

// Komponent strony głównej.
export default async function Home() {
  // Pobieranie listy produktów z bazy danych za pomocą Prisma i sortowanie ich według identyfikatora w kolejności malejącej.
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div>
      {/* Sekcja bohatera z głównym produktem */}
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          {/* Wyświetlanie obrazu głównego produktu za pomocą komponentu Image z Next.js */}
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={600}
            height={1000}
            className="w-full max-w-md rounded-lg shadow-2xl"
            priority
          />
          <div>
            {/* Wyświetlanie nazwy, opisu i przycisku "ZOBACZ PRODUKT" */}
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="py-6">{products[0].description}</p>
            <Link
              href={"/products/" + products[0].id}
              className="btn btn-primary"
            >
              ZOBACZ PRODUKT
            </Link>
          </div>
        </div>
      </div>

      {/* Sekcja z listą produktów */}
      <div className="my-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* Renderowanie listy produktów, pomijając pierwszy element (główny produkt) */}
        {products.slice(1).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
