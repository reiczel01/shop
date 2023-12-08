import Link from "next/link";
// Interfejs definiujący właściwości przekazywane do komponentu PaginationBar
interface PaginationBarProps {
  currentPage: number; // Numer aktualnej strony
  totalPages: number; // Całkowita liczba stron
}

// Komponent PaginationBar wyświetlający paski stron
export default function PaginationBar({
  currentPage, // Numer aktualnej strony
  totalPages, // Całkowita liczba stron
}: PaginationBarProps) {
  // Określenie maksymalnej i minimalnej strony do wyświetlenia w pasku
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10)); // Maksymalna strona
  const minPage = Math.max(1, Math.min(currentPage - 5, totalPages - 9)); // Minimalna strona

  // Tablica elementów JSX reprezentujących poszczególne strony
  const numberedPageItems: JSX.Element[] = [];

  // Generowanie elementów dla poszczególnych stron w zakresie od minPage do maxPage
  for (let page = minPage; page <= maxPage; page++) {
    // Dodanie elementu Link reprezentującego numer strony z odpowiednim stylem
    numberedPageItems.push(
      <Link
        href={"?page=" + page} // Adres URL dla danej strony
        key={page} // Unikalny klucz dla elementu
        className={`btn join-item ${
          currentPage === page ? "btn-active pointer-events-none" : "" // Dodatkowy styl dla aktualnej strony
        }`}
      >
        {page} {/* Numer strony */}
      </Link>,
    );
  }

  return (
    <>
      {/* Pasek stron widoczny na większych ekranach */}
      <div className="join hidden sm:block">{numberedPageItems}</div>
      
      {/* Pasek stron widoczny na mniejszych ekranach */}
      <div className="join block sm:hidden">
        {/* Przejście do poprzedniej strony, jeśli aktualna strona jest większa niż 1 */}
        {currentPage > 1 && (
          <Link href={"?page=" + (currentPage - 1)} className="btn join-item">
            « {/* Strzałka w lewo */}
          </Link>
        )}

        {/* Wyświetlenie numeru aktualnej strony oraz całkowitej liczby stron */}
        <button className="btn join-item pointer-events-none">
          Strona {currentPage} z {totalPages}
        </button>
        
        {/* Przejście do następnej strony, jeśli aktualna strona jest mniejsza niż totalPages */}
        {currentPage < totalPages && (
          <Link href={"?page=" + (currentPage + 1)} className="btn join-item">
            » {/* Strzałka w prawo */}
          </Link>
        )}
      </div>
    </>
  );
}

