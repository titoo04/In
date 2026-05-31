import { prototypeAssets } from "@/data/prototype";

type ScrollHintProps = {
  className?: string;
  tone?: "light" | "dark";
};

export default function ScrollHint({
  className,
  tone = "light",
}: ScrollHintProps) {
  const textColor = tone === "light" ? "text-white" : "text-black";

  return (
    <div
      className={`absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 ${
        className ?? ""
      }`.trim()}
    >
      <span
        className={`font-display text-[10px] tracking-[0.3em] ${textColor}`.trim()}
      >
        SCROLL
      </span>
      <img alt="" className="h-4 w-4" src={prototypeAssets.scrollArrow} />
    </div>
  );
}
