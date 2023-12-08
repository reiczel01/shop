"use server"
import { getCart, createCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

// Funkcja setProductQuantity służy do ustawiania ilości produktu w koszyku
export async function setProductQuantity(productId: string, quantity: number) {
    // Pobranie koszyka użytkownika lub utworzenie nowego, jeśli nie istnieje
    const cart = (await getCart()) ?? (await createCart());

    // Sprawdzenie, czy artykuł znajduje się już w koszyku
    const articleInCart = cart.items.find((item) => item.productId === productId);

    // Sprawdzenie, czy użytkownik chce ustawić ilość produktu na zero
    if (quantity === 0) {
        // Jeśli artykuł jest w koszyku, usuwamy go z bazy danych
        if (articleInCart) {
            await prisma.cartItem.delete({
                where: { id: articleInCart.id }
            });
        }
    } else {
        // Jeśli ilość produktu jest większa niż zero
        if (articleInCart) {
            // Jeśli artykuł jest w koszyku, aktualizujemy jego ilość w bazie danych
            await prisma.cartItem.update({
                where: { id: articleInCart.id },
                data: { quantity }
            });
        } else {
            // Jeśli artykuł nie jest jeszcze w koszyku, tworzymy nowy wpis w bazie danych dla tego artykułu
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity
                }
            });
        }
    }

    // Wywołanie funkcji revalidatePath w celu wygenerowania nowej ścieżki dla koszyka
    revalidatePath("/cart");
}