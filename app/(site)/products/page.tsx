import Link from "next/link";

import StateProductCard from "@/components/cart/StateProductCard";
import { stateProductCollections, stateProducts } from "@/data/state-products";

export default function ProductsPage() {
  const heroImage =
    stateProductCollections[0]?.heroImage ?? "/assets/images/noiseHero.png";

  return (
    <div className="bg-black">
      <section className="relative overflow-hidden bg-black text-white">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 px-16 py-16">
          <h1 className="uppercase --font-display text-center leading-tight font-extralight self-center">
            Each object is anchored to a state of awareness.
          </h1>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="rounded-3xl bg-black">
          <div className="grid grid-cols-2 gap-6">
            {stateProducts.map((product) => (
              <StateProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-6 text-center text-white">
          <Link
            className="pillar bg-[#D86A5A] uppercase py-3 px-9"
            href="/where-are-you-now"
          >
            Shop by state
          </Link>
          <p className="max-w-2xl text-xs text-white/80 --font-display font-thin">
            "in" is a concept-led project that explores different states of
            awareness through designed objects. each piece is part of a larger
            experience, created to be engaged with, not just consumed.
          </p>
          <Link
            className="text-sm text-white/80 uppercase font-medium self-start"
            href="/"
          >
            &lt; Back
          </Link>
        </div>
      </section>
    </div>
  );
}
