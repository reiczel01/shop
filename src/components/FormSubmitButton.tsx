"use client"; // To jest niejasne i nie jest standardowym importem w JavaScript/TypeScript, może być związaną z jakąś specyficzną konfiguracją lub narzędziem.

import { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

// Właściwości (props) przekazywane do komponentu FormSubmitButton.
type FormSubmitButtonProps = {
  children: React.ReactNode;  // Zawartość przycisku, może być dowolnym elementem React.
  className?: string;       // Opcjonalna klasa CSS dla niestandardowej stylizacji przycisku.
} & ComponentProps<"button">;  // Właściwości przekazywane odziedziczone od komponentu "button" z React.

// Komponent FormSubmitButton przyjmuje przekazane właściwości, w tym zawartość i opcjonalną klasę.
export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  // Pobieramy status formularza przy użyciu funkcji useFormStatus() z "react-dom".
  const { pending } = useFormStatus();

  return (
    <button {...props} className={`btn btn-primary ${className}`} type="submit" disabled={pending}>
      {pending && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}

