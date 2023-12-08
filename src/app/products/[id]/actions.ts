"use server";

import { getCart, createCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());// Pobranie koszyka lub utworzenie nowego

  const articleInCart = cart.items.find((item) => item.productId === productId);// Sprawdzenie, czy produkt znajduje się w koszyku


  if (articleInCart) {
        // Zwiększenie ilości produktu w koszyku, jeśli jest już w koszyku
    await prisma.cartItem.update({
      where: {
        id: articleInCart.id,
      },
      data: {
        quantity: {increment: 1},
      },
    });
  } else {
    // Dodanie produktu do koszyka, jeśli nie ma go jeszcze w koszyku
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  revalidatePath("/products/[id]");
}
