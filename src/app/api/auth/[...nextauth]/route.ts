import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/db/prisma";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import {env} from "@/lib/env";
import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";

// Konfiguracja opcji uwierzytelniania dla NextAuth
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter, // Ustawienie adaptera Prisma do obsługi danych uwierzytelniania
    providers: [
        GoogleProvider({ // Dodanie dostawcy uwierzytelniania Google
            clientId: env.GOOGLE_CLIENT_ID!, // Pobranie identyfikatora klienta Google z zmiennych środowiskowych
            clientSecret: env.GOOGLE_CLIENT_SECRET!, // Pobranie sekretu klienta Google z zmiennych środowiskowych
        })
    ],
    callbacks: {
        session({ session, user }) { // Ustawienie callbacka dla sesji użytkownika
            session.user.id = user.id; // Przypisanie identyfikatora użytkownika do sesji
            return session; // Zwrócenie zaktualizowanej sesji
        },
    },
    events: {
        async signIn({ user }) { // Definicja zdarzenia po pomyślnym uwierzytelnieniu
            await mergeAnonymousCartIntoUserCart(user.id); // Scalenie koszyka anonimowego z koszykiem użytkownika po uwierzytelnieniu
        }
    }
}

// Utworzenie obsługi zapytań GET i POST dla uwierzytelniania
const handler = NextAuth(authOptions);

// Eksportowanie handlera uwierzytelniania dla zapytań GET i POST
export { handler as GET, handler as POST }