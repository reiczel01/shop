import HeroProductCard from "@/components/HeroProductCard";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";

// Interfejs definiujący właściwości przekazywane do komponentu SearchPage
interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Wyszukiwanie: ${query} - Shopla`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
    // Zapytanie do bazy danych o produkty pasujące do zapytania wyszukiwania
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },// Wyszukanie po nazwie
        { description: { contains: query, mode: "insensitive" } },// Wyszukanie po opisie
      ],
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],// Sortowanie wyników
  });

    // Zliczenie całkowitej liczby elementów (produkty lub inne) w bazie danych
  const totalIetmCount = await prisma.product.count();

    // Sprawdzenie, czy znaleziono jakiekolwiek produkty pasujące do zapytania
  if (products.length === 0) {
        // Zwrócenie komunikatu o braku znalezionych produktów
    return (
      <div className="m-auto h-full">
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Ups! Nie znaleziono produktu.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="stats shadow">
        <div className="stat w-1/2 place-items-center">
          <div className="stat-title">Pasujace</div>
          <div className="stat-value">{products.length}</div>
        </div>

        <div className="stat w-1/2 place-items-center">
          <div className="stat-title">Przeszukane</div>
          <div className="stat-value text-secondary">{totalIetmCount}</div>
        </div>
      </div>

      {products.map((product) => (
        <HeroProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
