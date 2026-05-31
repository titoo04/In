import Link from "next/link";
import { notFound } from "next/navigation";

import { states } from "@/data/prototype";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return states.map((state) => ({ slug: state.slug }));
}

export default function StatePage({ params }: PageProps) {
  const stateIndex = states.findIndex((item) => item.slug === params.slug);
  const state = states[stateIndex];

  if (!state) {
    notFound();
  }

  const nextState = states[stateIndex + 1];
  const nextHref = nextState
    ? `/states/${nextState.slug}`
    : "/where-are-you-now";

  return (
    <div className="bg-[var(--color-paper)]">
      <section className="relative overflow-hidden bg-black text-white">
        {state.backgroundImage && (
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={state.backgroundImage}
          />
        )}
        {!state.backgroundImage && state.backgroundClass && (
          <div className={`absolute inset-0 ${state.backgroundClass}`} />
        )}
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            {state.index}
          </p>
          <h1 className="text-4xl font-semibold tracking-[0.2em] sm:text-5xl">
            {state.title}
          </h1>
          <p className="max-w-2xl text-base text-white/80">
            {state.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-100"
              href={nextHref}
            >
              Next state
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              href={`/shop/${state.slug}`}
            >
              Shop this state
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Reflection
            </p>
            <p className="mt-4 text-base text-zinc-700">
              Sit with this state for a moment. Notice the objects, materials,
              and pacing that match its tone.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Next steps
            </p>
            <p className="mt-4 text-base text-zinc-700">
              Move forward when you are ready, or return to the index to choose
              another state.
            </p>
            <Link
              className="mt-6 inline-flex items-center text-sm font-semibold text-zinc-900"
              href="/where-are-you-now"
            >
              View all states
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
