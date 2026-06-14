import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { categoryGroups } from "../data/categories.js";

export default function Navbar({
  filter,
  onClearFilters,
  onFilterChange,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectCategory(category, subcategory = "all") {
    onFilterChange({ category, subcategory });
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-2 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between gap-2 md:gap-3">
          <Link
            aria-label="Raj Footwear home"
            className="focus-ring flex min-w-0 flex-1 items-center gap-2 md:gap-3"
            to="/"
            onClick={onClearFilters}
          >
            <img
              alt="Raj Footwear logo"
              className="h-10 w-10 sm:h-[56px] sm:w-[56px] shrink-0 rounded-full border border-white/20 object-cover shadow-sm"
              src="/logo.png"
            />
            <span className="min-w-0 flex flex-col justify-center">
              <span className="block truncate text-xl font-black uppercase tracking-tight text-[#0B1736] sm:text-2xl leading-none">
                Raj Footwear
              </span>
              <span className="mt-1 block truncate text-[10px] font-semibold text-[#B91C1C] sm:text-xs leading-none">
                Romi Or Bunty Ki Dukan
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 justify-center">
            <span className="inline-flex items-center justify-center text-gray-700 text-sm font-medium">
              <span className="text-base sm:mr-1.5" aria-hidden="true">📍</span>
              <span className="hidden md:inline">Jawahar Ganj, Gangoh</span>
            </span>
          </div>

          <div className="relative flex shrink-0 justify-end" ref={menuRef}>
            <button
              className="focus-ring inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-md bg-[#0B1736] px-3 text-sm font-bold text-white transition hover:bg-[#0B1736]/90"
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="hidden sm:inline">Categories</span>
              <ChevronDown className="hidden h-3 w-3 sm:block opacity-70" />
            </button>

            {menuOpen ? (
              <div className="absolute right-0 top-full z-50 mt-3 w-[min(92vw,23rem)] rounded-lg border border-black/10 bg-white p-3 shadow-premium">
                <button
                  className={`focus-ring mb-2 flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-bold transition ${
                    filter.category === "all" ? "bg-brand-red text-white" : "bg-brand-mist text-brand-ink hover:bg-brand-soft"
                  }`}
                  type="button"
                  onClick={() => selectCategory("all", "all")}
                >
                  All Footwear
                  <span className="text-xs opacity-80">View all</span>
                </button>

                <div className="max-h-[68vh] space-y-3 overflow-auto pr-1">
                  {categoryGroups.map((category) => (
                    <div key={category.slug}>
                      <button
                        className={`focus-ring w-full rounded-md px-3 py-2 text-left text-sm font-black transition ${
                          filter.category === category.slug && filter.subcategory === "all"
                            ? "bg-brand-ink text-white"
                            : "text-brand-ink hover:bg-brand-soft"
                        }`}
                        type="button"
                        onClick={() => selectCategory(category.slug, "all")}
                      >
                        {category.title}
                      </button>
                      <div className="mt-1 grid grid-cols-1 gap-1">
                        {category.subcategories.map((subcategory) => (
                          <button
                            className={`focus-ring rounded-md px-3 py-2 text-left text-sm transition ${
                              filter.subcategory === subcategory.slug
                                ? "bg-brand-red text-white"
                                : "text-black/70 hover:bg-brand-mist hover:text-brand-ink"
                            }`}
                            key={subcategory.slug}
                            type="button"
                            onClick={() => selectCategory(category.slug, subcategory.slug)}
                          >
                            {subcategory.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
