import { Loader2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    show_price: true,
  });
  
  const [images, setImages] = useState([]); // File objects
  const [imagePreviews, setImagePreviews] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from("categories").select("*");
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  // Update subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const subs = categories.filter(c => c.category_name === formData.category).map(c => c.subcategory_name);
      setSubcategories(subs);
      if (!subs.includes(formData.subcategory)) {
        setFormData(prev => ({ ...prev, subcategory: subs[0] || "" }));
      }
    } else {
      setSubcategories([]);
    }
  }, [formData.category, categories]);

  const uniqueCategories = [...new Set(categories.map(c => c.category_name))];

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  }

  function removeImage(index) {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  }

  async function uploadImages() {
    const urls = [];
    for (const file of images) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
        
      urls.push(publicUrlData.publicUrl);
    }
    return urls;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.category || !formData.subcategory) {
        throw new Error("Please select a category and subcategory.");
      }

      let uploadedUrls = [];
      if (images.length > 0) {
        uploadedUrls = await uploadImages();
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: formData.price ? parseFloat(formData.price) : null,
        show_price: formData.show_price,
        image_urls: uploadedUrls
      };

      const { error: insertError } = await supabase.from("products").insert([productData]);

      if (insertError) throw insertError;

      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-ink">Add New Product</h1>
        <p className="mt-1 text-sm text-black/60">Fill in the details to add a new product to the store.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-brand-ink" htmlFor="name">Product Name *</label>
            <input
              id="name"
              required
              type="text"
              className="focus-ring mt-1 block w-full rounded-md border border-black/10 px-3 py-2 text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-ink" htmlFor="category">Category *</label>
            <select
              id="category"
              required
              className="focus-ring mt-1 block w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-ink" htmlFor="subcategory">Subcategory *</label>
            <select
              id="subcategory"
              required
              disabled={!formData.category}
              className="focus-ring mt-1 block w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm disabled:bg-brand-mist"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-ink">Display Price</label>
            <div className="mt-2 flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={formData.show_price === true}
                  onChange={() => setFormData({ ...formData, show_price: true })}
                  className="text-brand-red focus:ring-brand-red"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={formData.show_price === false}
                  onChange={() => setFormData({ ...formData, show_price: false })}
                  className="text-brand-red focus:ring-brand-red"
                />
                No
              </label>
            </div>
          </div>

          {formData.show_price && (
            <div>
              <label className="block text-sm font-bold text-brand-ink" htmlFor="price">Price (₹)</label>
              <input
                id="price"
                type="number"
                min="0"
                step="1"
                className="focus-ring mt-1 block w-full rounded-md border border-black/10 px-3 py-2 text-sm"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          )}

          <div className="md:col-span-2 border-t border-black/10 pt-6">
            <label className="block text-sm font-bold text-brand-ink">Product Images</label>
            
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {imagePreviews.map((url, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-md border border-black/10">
                  <img src={url} alt={`Preview ${i}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute right-1 top-1 rounded-full bg-white/80 p-1 text-red-600 shadow-sm hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-black/20 bg-brand-mist transition-colors hover:border-brand-red hover:bg-brand-soft text-black/50 hover:text-brand-red">
                <Upload className="h-6 w-6" />
                <span className="mt-2 text-xs font-bold">Upload</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="focus-ring flex items-center justify-center gap-2 rounded-md bg-brand-red px-6 py-2.5 text-sm font-black text-white transition hover:bg-brand-redDark disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
