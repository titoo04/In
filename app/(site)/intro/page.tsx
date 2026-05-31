import Link from "next/link";

import { prototypeAssets, states } from "@/data/prototype";

export default function IntroPage() {
  return (
    <div className="bg-[var(--color-paper)]">
      <section className="relative overflow-hidden bg-white">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={prototypeAssets.introBackground}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-24 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Introduction
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            The journey begins with observation.
          </h1>
          <p className="max-w-2xl text-base text-white/80">
            Each screen captures a state of awareness. Move through them in
            sequence or explore the ones that speak to you most right now.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-100"
              href="/states/noise"
            >
              Start with the noise
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              href="/where-are-you-now"
            >
              Choose a state
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <Link
              key={state.slug}
              className="rounded-3xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md"
              href={`/states/${state.slug}`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                {state.index}
              </p>
              <h2 className="mt-4 text-lg font-semibold text-zinc-900">
                {state.title}
              </h2>
              <p className="mt-3 text-sm text-zinc-600">{state.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
