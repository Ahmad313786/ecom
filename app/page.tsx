import Carousel from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5
  })
  console.log(products);

  return (
    <div>
      <section className="bg-slate-200 p-10 my-4" >
        <div className="flex flex-wrap justify-between " >
          <div className="px-10 py-20" >
            <h2 className="text-2xl font-bold" >Welcome to Ecommerce</h2>
            <p className="my-2" >Discover the latest products at low prices</p>
            <Button className="rounded-full" asChild><Link href="/products" >Browse All Products</Link></Button>
          </div>
          <Image alt="Banner image" width={450} height={450} src={products.data[0].images[0]} />
        </div>
      </section>
      <section>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
