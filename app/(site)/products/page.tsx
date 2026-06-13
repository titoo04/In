import Link from "next/link";

import StateProductCard from "@/components/cart/StateProductCard";
import { stateProductCollections, stateProducts } from "@/data/state-products";

export default function ProductsPage() {
  const heroImage =
    stateProductCollections[0]?.heroImage ?? "/assets/images/noiseHero.png";

  return (
    <div className="bg-black">
     
      <section className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-3xl bg-black">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-2 md:gap-6">
            {stateProducts.map((product) => (
              <StateProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-6 text-center text-white">
          <Link
            className="text-sm  uppercase font-medium self-start"
            href="/where-are-you-now"
          >
            &lt; Back
          </Link>
        </div>
      </section>
    </div>
  );
}
