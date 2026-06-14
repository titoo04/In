"use client";

import { useRef, useState } from "react";

import StateProductCard from "@/components/cart/StateProductCard";
import { mainProducts } from "@/data/state-products";
import Link from "next/link";

const slides = mainProducts;

export default function ShopLandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const nextIndex = Math.round(slider.scrollLeft / slider.clientWidth);
    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  };

  const goToSlide = (index: number) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.scrollTo({
      left: index * slider.clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section
      className="flex min-h-[calc(100vh-96px)] flex-col items-center justify-center bg-black px-4 py-10 text-white md:px-6 md:py-12"
      style={{
        backgroundImage: "url('/assets/images/shopBg.png')",
        backgroundSize: "contain",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <div className="text-center">
          <p className="text-[22px] font-script md:text-[24px]">Shop now</p>
        </div>

        <div
          ref={sliderRef}
          className="flex w-full max-w-2xl snap-x snap-mandatory overflow-x-auto px-2 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:px-0"
          onScroll={handleScroll}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex w-full shrink-0 snap-center justify-center px-2"
            >
              <div className="w-full max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem]">
                <StateProductCard product={slide} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Show slide ${index + 1}`}
              className={`h-3 w-3 rounded-full transition-all ${
                activeIndex === index ? "bg-orange" : "bg-white/35"
              }`}
              type="button"
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center gap-6 text-center text-white">
         <Link
            className="pillar bg-[#D86A5A] uppercase py-3 px-9"
            href="/products"
          >
            View all
          </Link>
        <p className="max-w-2xl text-xs text-white/80 --font-display font-thin">
          "in" is a concept-led project that explores different states of
          awareness through designed objects. each piece is part of a larger
          experience, created to be engaged with, not just consumed.
        </p>
        <Link
          className="text-sm text-white/80 uppercase font-medium self-start"
          href="/where-are-you-now"
        >
          &lt; Back
        </Link>
      </div>
    </section>
  );
}
