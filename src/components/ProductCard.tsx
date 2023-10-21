import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

// Interfejs określający właściwości (props) dla komponentu ProductCard
interface ProductCardProps {
  product: Product;
}

// Komponent ProductCard przyjmuje obiekt produktu jako argument.
export default function ProductCard({ product }: { product: Product }) {
  // Sprawdzenie, czy produkt jest uważany za nowy (mniej niż 7 dni od daty utworzenia).
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  // Komponent Link umożliwia nawigację do szczegółów produktu po kliknięciu.
  // Klasa "card" i inne style są używane do stylizacji komponentu.
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        {/* Komponent Image służy do wyświetlania obrazu produktu. */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={800}
          height={700}
          className="object-cover h-80"
        />
      </figure>
      <div className="card-body">
        {/* Jeśli produkt jest nowy, wyświetl etykietę "Nowość". */}
        {isNew && <div className="badge badge-secondary">Nowość</div>}
        <h2 className="card-title">
          {product.name}
        </h2>
        <p>{product.description}</p>
        {/* Komponent PriceTag służy do wyświetlania ceny produktu. */}
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}
