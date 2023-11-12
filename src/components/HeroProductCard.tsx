import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

// Interfejs określający właściwości (props) dla komponentu ProductCard
interface ProductCardProps {
  product: Product;
}

// Komponent ProductCard przyjmuje obiekt produktu jako argument.
export default function HeroProductCard({ product }: { product: Product }) {
  // Sprawdzenie, czy produkt jest uważany za nowy (mniej niż 7 dni od daty utworzenia).
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  // Komponent Link umożliwia nawigację do szczegółów produktu po kliknięciu.
  // Klasa "card" i inne style są używane do stylizacji komponentu.
  return (
    <div className="py-4 pb-4">
    <Link
    href={"/products/" + product.id}
    className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
  >
    <div className="hero rounded-xl bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
    
                    <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <div className="py-4 pb-4">
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <p className="py-6">{product.description}</p>
            <PriceTag price={product.price} />
            </div>
          </div>
      </div>
    </div>
    </Link>
    </div>
  );
}
