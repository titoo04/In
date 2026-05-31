import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/cart/AddToCartButton";
import Card from "@/components/ui/Card";
import { shopItems } from "@/data/prototype";
import { stateProductsById, stateProducts } from "@/data/state-products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const stateProduct = stateProductsById[slug];
  const fallbackProduct = shopItems.find((item) => item.slug === slug);
  const product = stateProduct ?? fallbackProduct;
  const productImage = stateProduct?.image;
  const productId = stateProduct?.id ?? fallbackProduct?.id ?? slug;

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Product
        </p>
        <h1 className="text-3xl font-semibold text-zinc-900">
          {product.name}
        </h1>
      </div>
      <Card className="flex flex-col gap-6">
        <div className="h-80 overflow-hidden  bg-zinc-100">
          {productImage ? (
            <img
              alt={product.name}
              className="h-full w-full object-cover"
              src={productImage}
            />
          ) : null}
        </div>
        <p className="text-thin text-zinc-700 uppercase">
          This is not a book to finish. It's something to move through. It
          doesn't ask you to change anything, only to <b>
             notice what's already
          there. </b> Across different states, it shifts with you, sometimes clear,
          sometimes unfamiliar, sometimes quiet.
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Price
          </p>
          <p className="text-lg font-semibold text-zinc-900">
            {product.price}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <AddToCartButton
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            productId={productId}
          />
          <Link
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            href="/products"
          >
            Back to products
          </Link>
        </div>
      </Card>
    </section>
  );
}

export function generateStaticParams() {
  const slugs = new Set([
    ...stateProducts.map((product) => product.id),
    ...shopItems.map((product) => product.slug),
  ]);
  return Array.from(slugs, (slug) => ({ slug }));
}
