import { Loader2, Trash2, Edit, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { formatPrice } from "../../utils/whatsapp.js";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(null);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    setDeleting(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert("Error deleting product: " + error.message);
    }
    setDeleting(null);
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-ink">Manage Products</h1>
          <p className="mt-1 text-sm text-black/60">View, search, and delete your products.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus-ring w-full rounded-md border border-black/10 bg-white py-2 pl-9 pr-4 text-sm focus:border-brand-red"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 bg-brand-mist text-xs uppercase text-black/60">
              <tr>
                <th className="px-4 py-3 font-black">Product</th>
                <th className="px-4 py-3 font-black">Category</th>
                <th className="px-4 py-3 font-black">Price</th>
                <th className="px-4 py-3 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-red" />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-black/60">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-brand-mist/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-black/10 bg-brand-mist">
                          {product.image_urls && product.image_urls[0] ? (
                            <img src={product.image_urls[0]} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-black/40">No Img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-brand-ink">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold">{product.category}</div>
                      <div className="text-xs text-black/60">{product.subcategory}</div>
                    </td>
                    <td className="px-4 py-3 font-bold">
                      {product.show_price ? formatPrice(product.price) : "Contact for Price"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="inline-flex items-center justify-center rounded-md p-2 text-black/40 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="Delete product"
                      >
                        {deleting === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
