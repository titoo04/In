import Link from "next/link";
import { notFound } from "next/navigation";

import StateProductCard from "@/components/cart/StateProductCard";
import {
  stateProductCollections,
  stateProductsBySlug,
} from "@/data/state-products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stateProductCollections.map((state) => ({ slug: state.slug }));
}

export default async function ShopPage({ params }: PageProps) {
  const { slug } = await params;
  const state = stateProductsBySlug[slug];

  if (!state) {
    notFound();
  }

  return (
    <div className="bg-black">
      <section className="relative overflow-hidden bg-black text-white">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={state.heroImage}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-12 md:px-10 lg:px-16 md:py-16">
          <h1 className="uppercase --font-display text-center text-2xl leading-tight font-light self-center md:text-3xl lg:text-4xl">
            {state.description}
          </h1>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-3xl bg-black">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-2 md:gap-6">
            {state.products.map((product) => (
              <StateProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-6 text-center text-white">
          <Link
            className="pillar bg-[#D86A5A] uppercase py-3 px-9"
            href="/products"
          >
            View all
          </Link>
          <p className="max-w-2xl text-xs text-white/80 --font-display font-thin">
            "in" is a concept-led project that explores different states of
            awareness through designed objects. each piece is part of a larger
            experience, created to be engaged with, not just consumed.
          </p>
          <Link
            className="text-sm text-white/80 uppercase font-medium self-start "
            href="/where-are-you-now"
          >
            &lt; Back
          </Link>
        </div>
      </section>
    </div>
  );
}
