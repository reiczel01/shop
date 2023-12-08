
import {getCart} from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";
import Link from "next/link";



// Obiekt metadata z informacjami o stronie
export const metadata = {
    title: "Twój koszyk", // Tytuł strony
    description: "Super sklep internetowy", // Opis strony
  };
  
  // Komponent CartPage reprezentujący stronę koszyka
  export default async function CartPage() {
    const cart = await getCart(); // Pobranie koszyka

    return(
        <div>
            <h1 className="my-4 text-3xl font-bold">Koszyk</h1>
            {cart?.items.map(cartItem => (
                <CartEntry key={cartItem.id} cartItem={cartItem}  setProductQuantity={setProductQuantity}/>
            ))}
            {!cart?.items.length && <p>Koszyk jest pusty</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Suma: {formatPrice(cart?.subtotal || 0)}
                </p>
                <Link href="/checkout">
                <button className="btn btn-primary sm:w-[200px]">Zamów</button>
                </Link>
            </div>
            
        </div>
    )
}