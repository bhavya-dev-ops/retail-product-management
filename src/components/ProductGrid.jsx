import { RotateCcw, SlidersHorizontal, Loader2 } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import { categoryGroups, getCategoryLabel, getSubcategoryLabel } from "../data/categories.js";
import { supabase } from "../lib/supabase.js";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ filter, onClearFilters, onFilterChange }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const availableSubcategories = useMemo(() => {
    if (filter.category === "all") {
      return [];
    }

    return categoryGroups.find((category) => category.slug === filter.category)?.subcategories ?? [];
  }, [filter.category]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Map category back to slug for filtering if needed, or filter by exact name
      const categorySlug = categoryGroups.find(c => c.title === product.category)?.slug || "all";
      const subcategorySlug = categoryGroups.flatMap(c => c.subcategories).find(s => s.title === product.subcategory)?.slug || "all";

      const matchesCategory =
        filter.category === "all" ? true : categorySlug === filter.category;
      const matchesSubcategory =
        filter.subcategory === "all" ? true : subcategorySlug === filter.subcategory;

      return matchesCategory && matchesSubcategory;
    });
  }, [filter, products]);

  function handleCategorySelect(event) {
    onFilterChange({ category: event.target.value, subcategory: "all" });
  }

  function handleSubcategorySelect(event) {
    onFilterChange({ category: filter.category, subcategory: event.target.value });
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-5 lg:px-8" id="products">
      <div className="sticky top-0 z-20 mb-8 -mx-4 flex flex-col gap-4 border-b border-black/5 bg-[#F6F5F2]/95 px-4 pb-4 pt-4 backdrop-blur-md sm:-mx-5 sm:px-5 lg:-mx-8 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-black uppercase text-brand-red">Collections</p>
          <h2 className="mt-1 text-2xl font-black text-brand-ink sm:text-3xl">
            Latest footwear picks
          </h2>
          <p className="mt-2 text-sm text-black/60">
            {filteredProducts.length} items in {getCategoryLabel(filter.category)} /{" "}
            {getSubcategoryLabel(filter.subcategory)}
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] lg:min-w-[34rem]">
          <label className="relative">
            <span className="sr-only">Category</span>
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
            <select
              className="focus-ring h-11 w-full rounded-md border border-black/10 bg-white pl-10 pr-3 text-sm font-semibold text-brand-ink shadow-sm"
              value={filter.category}
              onChange={handleCategorySelect}
            >
              <option value="all">All Categories</option>
              {categoryGroups.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Subcategory</span>
            <select
              className="focus-ring h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm font-semibold text-brand-ink shadow-sm disabled:bg-[#EAE8E3] disabled:text-black/40"
              disabled={filter.category === "all"}
              value={filter.subcategory}
              onChange={handleSubcategorySelect}
            >
              <option value="all">All Types</option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory.slug} value={subcategory.slug}>
                  {subcategory.title}
                </option>
              ))}
            </select>
          </label>

          <button
            className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-4 text-sm font-black text-brand-ink shadow-sm transition hover:border-brand-red hover:text-brand-red"
            type="button"
            onClick={onClearFilters}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.85rem)] lg:w-[calc(25%-0.95rem)]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-brand-red/40 bg-white p-8 text-center">
          <p className="text-lg font-black text-brand-ink">No matching products found.</p>
          <p className="mt-2 text-sm text-black/60">
            Try another category or subcategory.
          </p>
          <button
            className="focus-ring mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-5 text-sm font-black text-white transition hover:bg-brand-redDark"
            type="button"
            onClick={onClearFilters}
          >
            <RotateCcw className="h-4 w-4" />
            Show all products
          </button>
        </div>
      )}
    </section>
  );
}
