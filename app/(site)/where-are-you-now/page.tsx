import Link from "next/link";

import { states } from "@/data/prototype";

const buttonBase =
  "inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100";

export default function WhereAreYouNowPage() {
  return (
    <div className="w-70 m-auto">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        
        <h1 className="text-4xl font-semibold font-script">
          Where are you now?
        </h1>
       
        <div className="mt-4 flex w-full flex-col items-center gap-4">
          {states.map((state) => (
            <Link key={state.slug} className={buttonBase} href={`/shop/${state.slug}`}>
              {state.title}
            </Link>
          ))}
          <Link className=" border-zinc-200 text-zinc-700 underline font-script line-height-[1.5]" href="/shop/noise">
            The shop
          </Link>
        </div>
      </section>
    </div>
  );
}
