import Link from "next/link";

import Screen from "@/components/proto/Screen";
import ShopCard from "@/components/proto/ShopCard";
import type { ShopItem } from "@/data/prototype";

type ShopScreenProps = {
  title: string;
  description: string;
  items: ShopItem[];
  backgroundImage?: string;
  backgroundClassName?: string;
  backHref: string;
};

export default function ShopScreen({
  title,
  description,
  items,
  backgroundImage,
  backgroundClassName,
  backHref,
}: ShopScreenProps) {
  return (
    <Screen
      backgroundImage={backgroundImage}
      backgroundClassName={backgroundClassName}
      className="bg-black"
      overlayClassName="bg-black/55"
    >
      <div className="flex h-full flex-col text-white">
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="h-12 w-12 rounded-2xl bg-white/15" />
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 text-[10px]">
            1
          </div>
        </div>
        <div className="px-6 pt-4 text-center">
          <p className="font-display text-[12px] tracking-[0.3em]">{title}</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-white/70">
            {description}
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 px-6">
          {items.map((item) => (
            <ShopCard key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-auto flex flex-col items-center gap-6 px-6 pb-10">
          <button className="rounded-full border border-white/60 px-6 py-2 text-[10px] uppercase tracking-[0.35em]">
            View All
          </button>
          <Link
            className="text-[10px] uppercase tracking-[0.35em] text-white/70"
            href={backHref}
          >
            Back
          </Link>
        </div>
      </div>
    </Screen>
  );
}
