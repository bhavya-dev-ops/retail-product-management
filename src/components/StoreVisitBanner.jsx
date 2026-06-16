import { Store, Star, ShoppingBag, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function StoreVisitBanner() {
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
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 px-4 sm:px-5 lg:px-8 bg-[#F8F9FA]"
    >
      <div 
        className={`mx-auto max-w-7xl rounded-2xl overflow-hidden shadow-sm border border-black/5 bg-white transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Content */}
          <div className="flex-1 p-6 md:p-10 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B91C1C]/10 text-[#B91C1C]">
                <Store className="h-6 w-6" />
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0B1736] uppercase tracking-tight leading-tight">
                Many More Products<br className="hidden sm:block" /> Available In Store
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
              The products displayed on this website are only a small selection of our collection. Visit Raj Footwear to explore hundreds of additional footwear options for men, women, and kids.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-8">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <Store className="h-5 w-5 text-[#B91C1C] shrink-0" />
                <span className="font-bold text-[#0B1736] text-sm">Wholesale & Retail</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <Star className="h-5 w-5 text-[#B91C1C] shrink-0 fill-[#B91C1C]" />
                <span className="font-bold text-[#0B1736] text-sm">Serving Gangoh for 35+ Years</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <ShoppingBag className="h-5 w-5 text-[#B91C1C] shrink-0" />
                <span className="font-bold text-[#0B1736] text-sm">Hundreds of Styles In-Store</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <MapPin className="h-5 w-5 text-[#B91C1C] shrink-0" />
                <span className="font-bold text-[#0B1736] text-sm">Jawahar Ganj, Gangoh</span>
              </div>
            </div>
            
            <div className="mt-auto pt-5 border-t border-gray-100">
              <p className="text-xs md:text-sm font-medium text-gray-500 flex items-start sm:items-center gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 sm:mt-0 rounded-full bg-[#B91C1C] shrink-0 block"></span>
                Website showcases selected products only. Visit our store for the complete collection.
              </p>
            </div>
          </div>
          
          {/* Visual side for Desktop */}
          <div className="hidden lg:flex w-[40%] bg-[#0B1736] relative overflow-hidden items-center justify-center p-10">
            <div className="absolute inset-0 bg-[url('/shop-front.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
            
            <div className="relative z-20 w-full max-w-sm backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 text-white shadow-2xl transform transition-transform hover:scale-105 duration-500">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#B91C1C] p-3 shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black mb-2 uppercase tracking-wide">Find your perfect pair</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">Experience our premium quality and comfort in person at our physical store.</p>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold bg-white text-[#0B1736] hover:bg-gray-100 px-6 py-3 rounded-full transition-colors focus-ring shadow-md">
                Get Directions <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
