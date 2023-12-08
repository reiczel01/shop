"use client";

import { Session } from "next-auth";
import Image from "next/image";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { signIn, signOut } from "next-auth/react";

// Props dla komponentu UserMenuButton
interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;// Pobranie danych użytkownika z sesji, jeśli istnieje
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost rounded-btn">
        {user ? (
          <Image
            src={user?.image || profilePicPlaceholder}
            alt="Zdjie użytkownika"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
          </svg>
        )}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          {/* Warunek wyświetlający odpowiedni przycisk (zaloguj lub wyloguj) */}
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Wyloguj
            </button>
          ) : (
            <button onClick={() => signIn()}>Zaloguj</button>
          )}
        </li>
      </ul>
    </div>
  );
}
