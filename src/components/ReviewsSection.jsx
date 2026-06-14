import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Megha Sethi",
    avatar: "M",
    rating: 5,
    text: "Very helpful staff and excellent footwear collection. Highly recommended.",
  },
  {
    id: 2,
    name: "Kunal Arora",
    avatar: "K",
    rating: 5,
    text: "Courteous staff, affordable prices, and quality shoes. Must visit.",
  },
  {
    id: 3,
    name: "Amit Verma",
    avatar: "A",
    rating: 4,
    text: "Good collection for men, women, and kids. Great service.",
  },
  {
    id: 4,
    name: "Local Customer",
    avatar: "L",
    rating: 5,
    text: "Raj Footwear has been our family's trusted footwear shop for years.",
  },
];

export default function ReviewsSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      
      const nextIndex = (activeIndex + 1) % reviews.length;
      scrollToIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Update active index on manual scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollPosition = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.clientWidth;
    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const nextSlide = () => scrollToIndex((activeIndex + 1) % reviews.length);
  const prevSlide = () => scrollToIndex((activeIndex - 1 + reviews.length) % reviews.length);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-red">
            What Our Customers Say
          </p>
          <h2 className="mt-2 text-3xl font-black text-brand-ink sm:text-4xl">
            Trusted by families in Gangoh for over 20 years.
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded bg-brand-red"></div>
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Navigation Arrows (Desktop) */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 sm:-left-12 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-ink shadow-md transition hover:bg-brand-red hover:text-white hidden sm:flex border border-gray-100"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute -right-4 sm:-right-12 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-ink shadow-md transition hover:bg-brand-red hover:text-white hidden sm:flex border border-gray-100"
            aria-label="Next review"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full shrink-0 snap-center px-2 sm:px-4"
              >
                <div className="group mx-auto max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium border border-gray-50">
                  
                  {/* Rating */}
                  <div className="mb-4 flex items-center justify-center gap-1 sm:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? "fill-[#FABB05] text-[#FABB05]"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="mb-6 text-center text-lg sm:text-xl italic text-gray-700 sm:text-left leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center gap-4 sm:justify-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-xl font-bold text-brand-red border border-brand-red/10">
                      {review.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-brand-ink">{review.name}</h4>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <span className="inline-block h-3 w-3 rounded-full bg-[#34A853] text-[8px] flex items-center justify-center text-white">✓</span>
                        Verified Customer
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-brand-red"
                    : "w-2.5 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
