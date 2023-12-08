import { formatPrice } from "@/lib/format";

// Interfejs określający właściwości (props) dla komponentu PriceTag.
interface PriceTagProps {
    price: number;      // Cena produktu, która ma zostać wyświetlona.
    className?: string; // Opcjonalna klasa CSS, która może zostać przekazana do komponentu.
}

// Komponent PriceTag służy do wyświetlania sformatowanej ceny produktu.
export default function PriceTag({ price, className }: PriceTagProps) {
    return (
        <span className={`badge, ${className}`}>
            {/* Wywołujemy funkcję formatPrice z modułu "@/lib/format" i wyświetlamy sformatowaną cenę. */}
            {formatPrice(price)}
        </span>
    );
}
