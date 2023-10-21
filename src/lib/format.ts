export function formatPrice(price: number) {
  return (price / 100).toLocaleString("en-PL", {
    style: "currency",
    currency: "PLN",
  });
}