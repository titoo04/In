import Link from "next/link";

import Screen from "@/components/proto/Screen";
import ScrollHint from "@/components/proto/ScrollHint";
import type { StateScreen as StateScreenType } from "@/data/prototype";

type StateScreenProps = StateScreenType & {
  nextHref?: string;
  showScrollHint?: boolean;
};

export default function StateScreen({
  title,
  index,
  subtitle,
  backgroundImage,
  backgroundClass,
  nextHref,
  showScrollHint = true,
}: StateScreenProps) {
  return (
    <Screen
      backgroundImage={backgroundImage}
      backgroundClassName={backgroundClass}
      className="bg-black"
      overlayClassName="bg-black/35"
    >
      <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
        <p className="font-display text-[18px] tracking-[0.35em] text-white/90">
          {index}
        </p>
        <h1 className="mt-16 font-display text-[26px] tracking-[0.4em]">
          {title}
        </h1>
        <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-white/70">
          {subtitle}
        </p>
      </div>
      {showScrollHint && <ScrollHint />}
      {nextHref && (
        <Link
          aria-label="Continue"
          className="absolute inset-0"
          href={nextHref}
        />
      )}
    </Screen>
  );
}
