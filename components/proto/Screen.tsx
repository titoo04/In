import type { ReactNode } from "react";

type ScreenProps = {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundClassName?: string;
  overlayClassName?: string;
};

export default function Screen({
  children,
  className,
  backgroundImage,
  backgroundClassName,
  overlayClassName = "bg-black/40",
}: ScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-paper)] px-4 py-6 md:px-8 md:py-10">
      <div
        className={`relative h-[844px] w-full max-w-[390px] overflow-hidden rounded-[36px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:h-[1024px] md:max-w-[768px] ${
          className ?? ""
        }`.trim()}
      >
        {(backgroundImage || backgroundClassName) && (
          <div
            className={`absolute inset-0 ${backgroundClassName ?? ""}`.trim()}
          >
            {backgroundImage && (
              <img
                alt=""
                className="h-full w-full object-cover"
                src={backgroundImage}
              />
            )}
          </div>
        )}
        {overlayClassName && (
          <div className={`absolute inset-0 ${overlayClassName}`} />
        )}
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
}
