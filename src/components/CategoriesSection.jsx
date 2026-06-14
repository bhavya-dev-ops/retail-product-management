import { ArrowRight, Footprints } from "lucide-react";
import { categoryGroups } from "../data/categories.js";

export default function CategoriesSection({ filter, onFilterChange }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="categories">
      <div className="mb-10 text-center sm:text-left">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-red">Shop by category</p>
        <h2 className="mt-2 text-3xl font-black text-brand-ink sm:text-4xl">Find the right pair</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categoryGroups.map((category) => {
          const active = filter.category === category.slug && filter.subcategory === "all";

          return (
            <article
              className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border ${
                active ? "border-brand-red ring-1 ring-brand-red" : "border-gray-100"
              }`}
              key={category.slug}
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100 sm:h-56">
                <img
                  src={`/${category.slug}.png`}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-white shadow-lg">
                    <Footprints className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                
                {/* Badges/Chips */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {category.subcategories.map((subcategory) => (
                    <button
                      className={`focus-ring inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        filter.subcategory === subcategory.slug
                          ? "border-brand-red bg-brand-red text-white"
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-brand-red hover:bg-brand-soft hover:text-brand-ink"
                      }`}
                      key={subcategory.slug}
                      type="button"
                      onClick={() =>
                        onFilterChange({
                          category: category.slug,
                          subcategory: subcategory.slug,
                        })
                      }
                    >
                      {subcategory.title}
                    </button>
                  ))}
                </div>

                {/* Explore Button */}
                <div className="mt-auto pt-4">
                  <button
                    className={`focus-ring group/btn flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold transition-all ${
                      active
                        ? "bg-brand-red text-white hover:bg-brand-redDark"
                        : "bg-brand-mist text-brand-ink hover:bg-brand-ink hover:text-white"
                    }`}
                    type="button"
                    onClick={() => onFilterChange({ category: category.slug, subcategory: "all" })}
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
