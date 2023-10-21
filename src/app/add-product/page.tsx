import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

// Metadane strony "Dodaj produkt".
export const metadata = {
  title: "Dodaj produkt",
  description: "Dodaj produkt do sklepu",
};

// Funkcja asynchroniczna addProduct obsługuje dodawanie nowego produktu.
async function addProduct(formData: FormData) {
  "use server";
  // Pobieranie danych z formularza.
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price"));

  // Walidacja danych: sprawdzenie, czy wszystkie pola są wypełnione.
  if (!name || !description || !imageUrl || !price) {
    throw Error("Wszystkie pola są wymagane");
  }

  // Tworzenie nowego produktu w bazie danych przy użyciu Prisma.
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  // Przekierowanie na stronę główną po dodaniu produktu.
  redirect("/");
}

// Komponent AddProductPage służy do wyświetlania formularza dodawania produktu.
export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Dodawanie nowego produktu</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Nazwa produktu"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Opis produktu"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Link URL do obrazu"
          type="url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Cena bez przecinka [23,45zł -> 2345]"
          type="number"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
