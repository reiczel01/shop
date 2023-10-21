// Ta funkcja formatuje cenę przekazaną jako argument 'price' w formacie waluty polskiej (PLN).

export function formatPrice(price: number) {
  // Dzielimy cenę przez 100, aby przekształcić ją z groszy na złotówki.
  // Następnie używamy funkcji toLocaleString() do sformatowania liczby jako ciągu znaków,
  // używając formatu waluty i lokalizacji "pl-PL" (polska wersja językowa z walutą polską).
  return (price / 100).toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
}
