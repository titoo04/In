import type { ShopItem } from "@/data/prototype";

const imagePlaceholder = "bg-white/10";

type ShopCardProps = {
  item: ShopItem;
};

export default function ShopCard({ item }: ShopCardProps) {
  return (
    <div className="rounded-2xl border border-white/35 bg-white/5 p-3 text-center text-white">
      <div className={`mb-3 h-24 rounded-xl ${imagePlaceholder}`} />
      <p className="text-[9px] uppercase tracking-[0.25em] text-white/80">
        {item.name}
      </p>
      <p className="mt-1 text-[11px] text-white/90">{item.price}</p>
      <button className="mt-3 w-full rounded-full border border-white/60 py-1 text-[9px] uppercase tracking-[0.25em] text-white/85">
        Add To Cart
      </button>
    </div>
  );
}
