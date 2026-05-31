import { prototypeAssets } from "@/data/prototype";

type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <div
      className={`relative h-[184px] w-[143px] ${className ?? ""}`.trim()}
    >
      <p className="font-script text-[128px] leading-none text-black">in</p>
      <div className="absolute bottom-0 left-0 right-0">
      <p>رحلة الي الداخل</p>
      </div>
    </div>
  );
}
