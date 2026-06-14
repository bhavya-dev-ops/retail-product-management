import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const slides = [
  {
    id: 1,
    title: "Men's Collection",
    subtitle: "Premium Shoes, Slippers & Sandals",
    buttonText: "Shop Men's Collection",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1800&q=80",
    category: "mens-footwear"
  },
  {
    id: 2,
    title: "Women's Collection",
    subtitle: "Stylish & Comfortable Footwear",
    buttonText: "Shop Women's Collection",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1800&q=80",
    category: "womens-footwear"
  },
  {
    id: 3,
    title: "Kids Collection",
    subtitle: "School Shoes & Daily Wear",
    buttonText: "Shop Kids Collection",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1800&q=80",
    category: "kids-footwear"
  }
];

export default function Hero({ onFilterChange }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative overflow-hidden bg-brand-ink text-white group">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover object-[75%_center] sm:object-center transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-80 z-10" : "opacity-0 z-0"
            }`}
            src={slide.image}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/100 via-brand-ink/60 to-brand-ink/10 sm:bg-gradient-to-br sm:from-brand-ink/80 sm:via-brand-ink/40 sm:to-brand-red/30 z-20 pointer-events-none" />
      </div>

      <div className="relative z-30 mx-auto flex min-h-[34rem] w-full max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:min-h-[26rem] sm:pb-12 sm:pt-16 md:min-h-[36rem] lg:px-8">
        <div className="max-w-3xl">
          {/* Static Branding */}
          <h1 className="text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl text-shadow-sm">
            Raj Footwear
          </h1>
          <p className="mt-2 text-xl font-bold text-white/90 sm:text-2xl text-shadow-sm">
            Romi Or Bunty Ki Dukan
          </p>
          <p className="mt-3 text-lg font-black text-brand-red sm:text-xl text-shadow-sm mb-6">
            Sabse Sasta Sabke Liye
          </p>

          {/* Dynamic Content */}
          <div className="relative min-h-[140px] w-full grid">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                style={{ gridArea: "1 / 1" }}
                className={`flex flex-col justify-end sm:justify-start transition-all duration-700 ease-in-out ${
                  index === current
                    ? "opacity-100 translate-x-0 pointer-events-auto z-10"
                    : "opacity-0 -translate-x-8 pointer-events-none z-0"
                }`}
              >
                <h2 className="text-2xl font-bold text-white sm:text-3xl text-shadow-sm">
                  {slide.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/90 sm:text-base text-shadow-sm">
                  {slide.subtitle}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-red px-6 text-sm font-black text-white shadow-lg shadow-black/20 transition hover:bg-brand-redDark"
                    type="button"
                    onClick={() => onFilterChange({ category: slide.category, subcategory: "all" })}
                  >
                    {slide.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-40 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
              index === current ? "w-8 bg-brand-red" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 right-4 z-40 hidden md:flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur transition hover:bg-black/40 hover:text-brand-red border border-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur transition hover:bg-black/40 hover:text-brand-red border border-white/10"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
