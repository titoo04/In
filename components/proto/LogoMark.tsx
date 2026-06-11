import { prototypeAssets } from "@/data/prototype";

type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <div
      className={`relative h-[184px] w-[143px] ${className ?? ""}`.trim()}
    >
      <img src="/assets/images/logo.png" alt="" />
    </div>
  );
}
