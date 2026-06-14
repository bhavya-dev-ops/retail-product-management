import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { Loader2 } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("categories").select("*").order("category_name");
      if (!error && data) {
        // Group by category_name
        const grouped = data.reduce((acc, curr) => {
          if (!acc[curr.category_name]) {
            acc[curr.category_name] = [];
          }
          acc[curr.category_name].push(curr.subcategory_name);
          return acc;
        }, {});
        
        const formatted = Object.keys(grouped).map(key => ({
          name: key,
          subcategories: grouped[key]
        }));
        setCategories(formatted);
      }
      setLoading(false);
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-ink">Category Management</h1>
        <p className="mt-1 text-sm text-black/60">View all configured categories and subcategories.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.name} className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
            <div className="border-b border-black/10 bg-brand-mist px-4 py-3">
              <h2 className="text-lg font-black text-brand-ink">{category.name}</h2>
            </div>
            <ul className="divide-y divide-black/10">
              {category.subcategories.map((sub) => (
                <li key={sub} className="px-4 py-3 text-sm text-black/80">
                  {sub}
                </li>
              ))}
              {category.subcategories.length === 0 && (
                <li className="px-4 py-3 text-sm italic text-black/40">No subcategories</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
