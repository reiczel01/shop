import prisma from "./prisma";
import { cookies } from "next/dist/client/components/headers";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Definicja niestandardowego typu reprezentującego koszyk z produktami
export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

// Definicja niestandardowego typu reprezentującego pozycję koszyka z produktem
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

// Definicja niestandardowego typu reprezentującego koszyk zakupowy
export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
    // Pobranie sesji serwera
  const session = await getServerSession(authOptions);

// Inicjalizacja koszyka jako null
  let cart: CartWithProducts | null = null;
  // Sprawdzenie istnienia sesji
  if (session) {
    // Pobranie koszyka użytkownika z bazy danych
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    // Pobranie identyfikatora koszyka z ciasteczka
    const localCartId = cookies().get("localCartId")?.value;
    // Pobranie koszyka anonimowego z bazy danych
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: {
            id: localCartId,
          },
          include: { items: { include: { product: true } } },
        })
      : null;
  }

  if (!cart) {
    return null;
  }
  // Obliczanie rozmiaru i podsumowania częściowego koszyka
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
    // Pobranie lokalnego identyfikatora koszyka
  const session = await getServerSession(authOptions);

  let newCart: Cart;
// Sprawdzenie istnienia sesji
  if (session) {
            // Utworzenie nowego koszyka dla zalogowanego użytkownika
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
            // Utworzenie nowego koszyka dla anonimowego użytkownika
    newCart = await prisma.cart.create({
      data: {},
    });

    //TODO: Dodać szyfrowanie id koszyka
    cookies().set("localCartId", newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function mergeAnonymousCartIntoUserCart(userId: string) {
  // Pobranie identyfikatora lokalnego koszyka
  const localCartId = cookies().get("localCartId")?.value;

  // Pobranie koszyka anonimowego na podstawie identyfikatora lokalnego
  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: { items: true }, // Pobranie elementów koszyka
      })
    : null;

  // Jeśli nie istnieje koszyk anonimowy, zakończ funkcję
  if (!localCart) return;

  // Pobranie koszyka użytkownika
  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true }, // Pobranie elementów koszyka
  });

  // Transakcja prisma
  await prisma.$transaction(async tx => {
    // Jeśli koszyk użytkownika istnieje
    if (userCart) {
      // Scal elementy koszyka anonimowego z elementami koszyka użytkownika
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      // Usuń wszystkie elementy koszyka użytkownika
      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      // Utwórz nowe elementy koszyka użytkownika na podstawie scalonych elementów
      await tx.cartItem.createMany({
        data: mergedCartItems.map(item => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      // Jeśli koszyk użytkownika nie istnieje, stwórz nowy
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    // Usuń koszyk anonimowy po scaleniu
    await tx.cart.delete({
      where: { id: localCart.id },
    });

    // Rzucenie błędu w celu symulacji testowej sytuacji (DO NOT USE IT IN PRODUCTION)
    throw Error("Test");

    // Wyczyszczenie identyfikatora lokalnego koszyka (po udanej transakcji)
    cookies().set("localCartId", "");
  });
}

// Funkcja scalająca elementy koszyka
function mergeCartItems(...cartItems: CartItem[][]) : CartItem[] {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      // Sprawdź, czy dany produkt już istnieje w koszyku
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        // Jeśli istnieje, dodaj do istniejącej ilości nową ilość produktu
        existingItem.quantity += item.quantity;
      } else {
        // W przeciwnym razie dodaj nowy produkt do koszyka
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]); // Początkowa tablica elementów koszyka
}