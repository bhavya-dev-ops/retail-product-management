import { useEffect, useRef, useState } from "react";
import { Star, Users, Footprints, IndianRupee } from "lucide-react";

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const cards = [
    {
      icon: <Star className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-brand-red" />,
      title: "20+ Years of Service",
      description: "Serving customers with quality footwear for over 20 years.",
      delay: "delay-[0ms]",
    },
    {
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-brand-red" />,
      title: "Trusted Local Shop",
      description: "Serving families in Jawahar Ganj, Gangoh.",
      delay: "delay-[100ms]",
    },
    {
      icon: <Footprints className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-brand-red" />,
      title: "Men's, Women's & Kids",
      description: "Footwear for every age and occasion.",
      delay: "delay-[200ms]",
    },
    {
      icon: <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-brand-red" />,
      title: "Affordable Prices",
      description: "Quality footwear at budget-friendly prices.",
      delay: "delay-[300ms]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-brand-mist py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl lg:text-4xl leading-tight sm:leading-tight">
            Why Customers Trust{" "}
            <span className="block sm:inline whitespace-nowrap text-brand-red">
              Raj Footwear
            </span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 rounded bg-brand-red"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative flex flex-col items-center rounded-2xl bg-white p-4 sm:p-6 lg:p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-premium
                ${
                  isVisible
                    ? `translate-y-0 opacity-100 ${card.delay}`
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              <div className="mb-3 sm:mb-4 lg:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-brand-soft transition-transform duration-300 group-hover:scale-110">
                {card.icon}
              </div>
              <h3 className="mb-1.5 sm:mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg font-bold text-brand-ink">
                {card.title}
              </h3>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
