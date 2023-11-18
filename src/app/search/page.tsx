import HeroProductCard from "@/components/HeroProductCard";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";

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
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });

  const totalIetmCount = await prisma.product.count();

  if (products.length === 0) {
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
