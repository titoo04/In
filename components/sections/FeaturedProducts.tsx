import Link from "next/link";

import Card from "@/components/ui/Card";
import { products } from "@/data/products";

const featuredProducts = products.slice(0, 3);

export default function FeaturedProducts() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Featured Work
          </p>
          <h2 className="text-2xl font-semibold text-zinc-900">
            Signature product studies
          </h2>
        </div>
        <Link className="text-sm font-medium text-zinc-600" href="/products">
          View all
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {featuredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <Card className="h-full">
              <div className="flex flex-col gap-3">
                <div className="h-32 rounded-2xl bg-zinc-100" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-600">{product.summary}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
