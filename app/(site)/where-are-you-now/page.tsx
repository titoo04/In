import Link from "next/link";
import type { CSSProperties } from "react";

import { states } from "@/data/prototype";

const pillImageBySlug: Record<string, string> = {
  noise: "/assets/images/NoiseButton.jpg",
  self: "/assets/images/SelfButton.jpg",
  others: "/assets/images/OthersButton.jpg",
  past: "/assets/images/PastButton.jpg",
  quiet: "/assets/images/QuietButton.jpg",
  now: "/assets/images/NowButton.jpg",
};

export default function WhereAreYouNowPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white">
        <div className="relative z-10 mx-auto flex  max-w-3xl flex-col items-center  gap-5 px-6 py-10 text-center md:gap-6 md:px-8">
          <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 md:text-xs">
            Final step
          </p>
          <h1 className="font-script text-4xl font-semibold text-zinc-900 sm:text-4xl md:text-5xl">
            Where are you now?
          </h1>

          <div className="mt-2 flex w-70 flex-col items-center gap-4 md:gap-5">
            {states.map((state) => (
              <Link
                key={state.slug}
                className="state-pill w-full px-5 py-4 text-center text-xl font-lightthin md:px-6 md:py-5 md:text-2xl"
                href={`/shop/${state.slug}`}
                style={
                  {
                    "--state-bg": `url(${pillImageBySlug[state.slug] ?? state.backgroundImage ?? "/assets/images/NoiseButton.jpg"})`,
                  } as CSSProperties
                }
              >
                <span className="relative z-10 text-white">{state.title}</span>
              </Link>
            ))}
            <Link
              className="text-black text-xl underline font-script line-height-[1.5] md:text-2xl"
              href="/shop"
            >
              The shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
