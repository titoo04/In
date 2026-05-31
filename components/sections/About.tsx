export default function About() {
  return (
    <section
      id="about"
      className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16"
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          About the Project
        </p>
        <h2 className="text-2xl font-semibold text-zinc-900">
          Graduation project overview
        </h2>
      </div>
      <p className="max-w-3xl text-base text-zinc-600">
        This portfolio presents a set of branded product concepts designed for a
        graphic design graduation project. Each product highlights a specific
        visual system, packaging exploration, and presentation style.
      </p>
    </section>
  );
}
