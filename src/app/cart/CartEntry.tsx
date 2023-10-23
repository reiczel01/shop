"use client"

import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image"; 
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { useTransition } from "react";
import { setProductQuantity } from "./actions";


interface CardEntryProps{
    cartItem: CartItemWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

export default function CardEntry({cartItem : {product, quantity}}: CardEntryProps){
    const [isPending, startTransaction] = useTransition();

    const quantityOptions: JSX.Element[] = [];
    for (let i = 1; i <= 99; i++){
        quantityOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        )
    }
    return(
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg shadow-md"
                />
                <div>
                    <Link href={"products/" + product.id} className="font-bold">
                        {product.name}
                    </Link>
                    <div>Cena: {formatPrice(product.price)}</div>
                    <div className="my-1 flex items-center gap-2">
                        Ilość:
                        <select className="select select-bordered w-full max-w-[80px]"
                        defaultValue={quantity}
                        onChange={e => {
                            const newQuantity = parseInt(e.currentTarget.value);
                            startTransaction(async () => {
                                await setProductQuantity(product.id, newQuantity);
                            })
                        }}
                        >
                            <option value={0}>0 (Usuń)</option>
                            {quantityOptions}
                        </select>
                        {isPending && <span className="loading loading-spinner loading-sm" />}

                    </div>
                    <div className="flex items-center gap-3">
                        Suma: {formatPrice(product.price * quantity)}
                    </div>
                </div>
            </div>
            <div className="divider" />
        </div>
    )
}