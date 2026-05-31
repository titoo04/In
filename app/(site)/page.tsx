"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import LogoMark from "@/components/proto/LogoMark";
import ScrollHint from "@/components/proto/ScrollHint";
import { states } from "@/data/prototype";

const JOURNEY_COOKIE = "journey_complete";
const pillImageBySlug: Record<string, string> = {
  noise: "/assets/images/NoiseButton.jpg",
  self: "/assets/images/SelfButton.jpg",
  others: "/assets/images/OthersButton.jpg",
  past: "/assets/images/PastButton.jpg",
  quiet: "/assets/images/QuietButton.jpg",
  now: "/assets/images/NowButton.jpg",
};

export default function Home() {
  const endRef = useRef<HTMLDivElement | null>(null);
  const [journeyComplete, setJourneyComplete] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  const [introVideoError, setIntroVideoError] = useState(false);

  useEffect(() => {
    document.body.classList.add("journey-active");
    document.documentElement.classList.add("journey-active");
    return () => {
      document.body.classList.remove("journey-active");
      document.documentElement.classList.remove("journey-active");
    };
  }, []);

  useEffect(() => {
    if (!showSplash) {
      document.body.classList.remove("splash-active");
      document.documentElement.classList.remove("splash-active");
      return;
    }

    document.body.classList.add("splash-active");
    document.documentElement.classList.add("splash-active");
    const fadeTimer = window.setTimeout(() => {
      setSplashFading(true);
    }, 2000);
    const removeTimer = window.setTimeout(() => {
      setShowSplash(false);
    }, 2600);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [showSplash]);

  useEffect(() => {
    setJourneyComplete(document.cookie.includes(`${JOURNEY_COOKIE}=1`));
  }, []);

  useEffect(() => {
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-journey-panel]")
    );

    if (panels.length === 0 || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const indexAttr = entry.target.getAttribute("data-journey-index");
          const index = indexAttr ? Number(indexAttr) : 0;
          setActiveIndex(index);
        });
      },
      { threshold: 0.6 }
    );

    panels.forEach((panel) => observer.observe(panel));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!endRef.current) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setJourneyComplete(true);
          document.cookie = `${JOURNEY_COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, []);

  const markJourneyComplete = () => {
    setJourneyComplete(true);
    document.cookie = `${JOURNEY_COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
  };

  const dismissSplash = () => {
    setShowSplash(false);
    setSplashFading(false);
  };

  return (
    <div className="journey-flow bg-[var(--color-paper)]">
      {showSplash && (
        <div
          className={`splash-screen ${splashFading ? "is-fading" : ""}`.trim()}
          role="button"
          tabIndex={0}
          aria-label="Enter site"
          onClick={dismissSplash}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              dismissSplash();
            }
          }}
        >
          <LogoMark />
        </div>
      )}

      <section
        className={`journey-panel ${activeIndex === 0 ? "is-active" : ""}`.trim()}
        style={{ zIndex: 1 }}
        data-journey-panel
        data-journey-index={0}
      >
        <div className="relative min-h-screen overflow-hidden bg-black">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/images/TheNoiseBg.png"
          />
          {!introVideoError && (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={() => setIntroVideoError(true)}
            >
              <source src="/assets/videos/N1.mp4" type="video/mp4" />
              <source src="/assets/videos/N1.mov" type="video/quicktime" />
            </video>
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 flex min-h-screen items-center justify-center px-8">
            <img
              alt=""
              className="w-full max-w-md"
              src="/assets/images/TextBg.png"
            />
          </div>
        </div>
      </section>

      {states.map((state, index) => (
        <section
          key={state.slug}
          className={`journey-panel ${
            activeIndex === index + 1 ? "is-active" : ""
          }`.trim()}
          style={{ zIndex: index + 2 }}
          data-journey-panel
          data-journey-index={index + 1}
        >
          <div className="relative min-h-screen overflow-hidden bg-black">
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
            <div className="absolute top-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.35em] text-white/80">
              {state.index}
            </div>
            <div className="relative z-10 min-h-screen" />
          </div>
        </section>
      ))}

      <section
        ref={endRef}
        className={`journey-panel ${
          activeIndex === states.length + 1 ? "is-active" : ""
        }`.trim()}
        style={{ zIndex: states.length + 2 }}
        data-journey-panel
        data-journey-index={states.length + 1}
      >
        <div className="relative min-h-screen overflow-hidden bg-white">
          <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">
              Final step
            </p>
            <h2 className="font-script text-5xl font-semibold text-zinc-900 sm:text-4xl">
              Where are you now?
            </h2>
          
            <div className="mt-2 flex w-70 flex-col items-center gap-5">
              {states.map((state) => (
                <Link
                  key={state.slug}
                  className="state-pill w-full px-6 py-4 text-center text-2xl font-lightthin"
                  href={`/shop/${state.slug}`}
                  onClick={markJourneyComplete}
                  style={
                    {
                      "--state-bg": `url(${pillImageBySlug[state.slug] ?? state.backgroundImage ?? "/assets/images/NoiseButton.jpg"})`,
                    } as CSSProperties
                  }
                >
                  <span className="relative z-10 text-white">{state.title}</span>
                </Link>
              ))}
                <Link className=" border-zinc-200 text-2xl underline font-script line-height-[1.5]" href="/shop/noise">
            The shop
          </Link>
            </div>
            {!journeyComplete && <ScrollHint tone="dark" />}
          </div>
        </div>
      </section>
    </div>
  );
}
