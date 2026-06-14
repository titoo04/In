"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import LogoMark from "@/components/proto/LogoMark";
import ScrollHint from "@/components/proto/ScrollHint";
import { states } from "@/data/prototype";

const JOURNEY_COOKIE = "journey_complete";
const SPLASH_COOKIE = "splash_seen";
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
    const removeSplashState = () => {
      document.body.classList.remove("splash-active");
      document.documentElement.classList.remove("splash-active");
    };

    if (document.cookie.includes(`${SPLASH_COOKIE}=1`)) {
      setShowSplash(false);
      setSplashFading(false);
      removeSplashState();
      return;
    }

    if (!showSplash) {
      removeSplashState();
      return;
    }

    document.body.classList.add("splash-active");
    document.documentElement.classList.add("splash-active");
    const fadeTimer = window.setTimeout(() => {
      setSplashFading(true);
    }, 2000);
    const removeTimer = window.setTimeout(() => {
      setShowSplash(false);
      document.cookie = `${SPLASH_COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
    }, 2600);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      removeSplashState();
    };
  }, [showSplash]);

  useEffect(() => {
    setJourneyComplete(document.cookie.includes(`${JOURNEY_COOKIE}=1`));
  }, []);

  useEffect(() => {
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-journey-panel]"),
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
      { threshold: 0.6 },
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
      { threshold: 0.3 },
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
    document.cookie = `${SPLASH_COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
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
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          {!introVideoError && (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/images/TheNoiseBg.png"
              onError={() => setIntroVideoError(true)}
            >
              <source src="/assets/videos/N1.mp4" type="video/mp4" />
              <source src="/assets/videos/N1.mov" type="video/quicktime" />
            </video>
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 flex webkit-fill-available items-center justify-center px-6 md:px-10 lg:px-8">
            <img
              alt=""
              className="w-full max-w-sm md:max-w-2xl lg:max-w-md"
              src="/assets/images/TextBg.png"
              loading="eager"
              fetchPriority="high"
              decoding="async"
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
          <div className="relative webkit-fill-available overflow-hidden bg-black">
            {state.backgroundImage && (
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                src={state.backgroundImage}
                loading="lazy"
                decoding="async"
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
        id="where-are-you-now"
        ref={endRef}
        className={`journey-panel ${
          activeIndex === states.length + 1 ? "is-active" : ""
        }`.trim()}
        style={{ zIndex: states.length + 2 }}
        data-journey-panel
        data-journey-index={states.length + 1}
      >
        <div className="relative webkit-fill-available overflow-hidden bg-white">
          <div className="relative z-10 mx-auto flex webkit-fill-available max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 md:text-xs">
              Final step
            </p>
            <h2 className="font-script text-4xl font-semibold text-zinc-900 sm:text-4xl md:text-5xl">
              Where are you now?
            </h2>

            <div className="mt-2 flex w-70 flex-col items-center gap-4 md:gap-5">
              {states.map((state) => (
                <Link
                  key={state.slug}
                  className="state-pill w-full px-5 py-4 text-center text-xl font-lightthin md:px-6 md:py-5 md:text-2xl"
                  href={`/shop/${state.slug}`}
                  onClick={markJourneyComplete}
                  style={
                    {
                      "--state-bg": `url(${pillImageBySlug[state.slug] ?? state.backgroundImage ?? "/assets/images/NoiseButton.jpg"})`,
                    } as CSSProperties
                  }
                >
                  <span className="relative z-10 text-white">
                    {state.title}
                  </span>
                </Link>
              ))}
              <Link
                className=" text-xl text-black underline font-script line-height-[1.5] md:text-2xl"
                href="/shop"
              >
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
