"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useTransition } from "react";
import { setProductQuantity } from "./actions";

// Props dla komponentu CardEntry
interface CardEntryProps {
  cartItem: CartItemWithProduct; // Obiekt zawierający informacje o elemencie koszyka i jego produktach
  setProductQuantity: (productId: string, quantity: number) => Promise<void>; // Funkcja do ustawiania ilości produktu w koszyku
}

// Komponent CardEntry reprezentujący pojedynczy wpis produktu w koszyku
export default function CardEntry({
  cartItem: { product, quantity }, // Destructuring propsa cartItem na product i quantity
}: CardEntryProps) {
  const [isPending, startTransaction] = useTransition(); // Użycie hooka useTransition

  // Generowanie listy opcji ilości produktu do wyboru
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg shadow-md"
        />
        <div>
          <Link href={"products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div>Cena: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Ilość:
            <select
              className="select select-bordered select-sm w-full max-w-[60px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransaction(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (Usuń)</option>
              {quantityOptions}
            </select>
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
          <div className="flex items-center gap-3">
            Suma: {formatPrice(product.price * quantity)}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
