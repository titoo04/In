import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-20">
      <div className="flex flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Graphic Design Graduate
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
          A product showcase shaped by brand stories, materials, and form.
        </h1>
        <p className="max-w-2xl text-base text-zinc-600">
          A curated set of visual product explorations that highlight identity,
          packaging, and presentation across multiple formats.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          href="/products"
        >
          View products
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
          href="#about"
        >
          Project details
        </Link>
      </div>
    </section>
  );
}
