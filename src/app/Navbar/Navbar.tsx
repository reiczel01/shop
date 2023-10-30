import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


async function serchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?querys" + searchQuery);
  }
}

export default async function Navbar() {
    const cart = await getCart();
    const session = await getServerSession(authOptions);

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-[80%] flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image
              //TODO: Zmienić Logo
              src={logo}
              alt="Shopla logo"
              width={40}
              height={40}
            />
            Shopla
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={serchProducts}>
            <div className="form-control">
              <input
                name="serchQuery"
                placeholder="Szukaj"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session}/>
        </div>
      </div>
    </div>
  );
}
