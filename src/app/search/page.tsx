import HeroProductCard from "@/components/HeroProductCard";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Shopla`,
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
    orderBy: { id: "desc" },
  });

  const totalIetmCount = await prisma.product.count();


  if (products.length === 0) {
    return <div className="text-center">Nieznaleziono produktu</div>;
  }

  return (
    <div className="flex flex-col items-center">
     

      <div className="stats shadow">
  
  <div className="stat place-items-center w-1/2">
    <div className="stat-title">Pasujce</div>
    <div className="stat-value">{products.length}</div>
  </div>
  
  <div className="stat place-items-center w-1/2">
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
