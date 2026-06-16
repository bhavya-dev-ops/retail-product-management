import { Loader2, Upload, X, Camera, ImagePlus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import ImageCropper from "../../components/admin/ImageCropper";
import heic2any from "heic2any";


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
  
  const [filesToCrop, setFilesToCrop] = useState([]);
  const [currentFileToCropUrl, setCurrentFileToCropUrl] = useState(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  
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

  async function processFiles(fileList) {
    let newFiles = Array.from(fileList);
    let validFiles = [];

    for (let file of newFiles) {
      const isDuplicate = [...images, ...filesToCrop].some(
        f => f.name === file.name && f.size === file.size
      );
      if (isDuplicate) continue;

      if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
        try {
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.8
          });
          const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          const newFileName = file.name.replace(/\.heic$/i, '.jpg');
          const jpgFile = new File([blob], newFileName, { type: "image/jpeg" });
          validFiles.push(jpgFile);
        } catch (e) {
          console.error("HEIC conversion error:", e);
        }
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      setFilesToCrop(prev => [...prev, ...validFiles]);
    }
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    e.target.value = null;
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    if (filesToCrop.length > 0 && !currentFileToCropUrl) {
      const file = filesToCrop[0];
      setCurrentFileToCropUrl(URL.createObjectURL(file));
    }
  }, [filesToCrop, currentFileToCropUrl]);

  const handleCropComplete = (croppedFile) => {
    setImages(prev => [...prev, croppedFile]);
    setImagePreviews(prev => [...prev, URL.createObjectURL(croppedFile)]);
    
    const remainingFiles = filesToCrop.slice(1);
    setFilesToCrop(remainingFiles);
    setCurrentFileToCropUrl(null);
  };

  const handleCropCancel = () => {
    const remainingFiles = filesToCrop.slice(1);
    setFilesToCrop(remainingFiles);
    setCurrentFileToCropUrl(null);
  };

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
            <p className="mt-1 text-xs font-semibold text-black/60">Place the footwear in the center and ensure the entire product is visible.</p>
            
            <div 
              className={`mt-4 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${isDragging ? 'border-brand-red bg-brand-soft' : 'border-black/20 bg-brand-mist'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="focus-ring flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-brand-ink shadow-sm border border-black/10 hover:border-brand-red hover:text-brand-red transition-colors"
                >
                  <ImagePlus className="h-4 w-4" />
                  Upload from Gallery
                </button>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="focus-ring flex items-center gap-2 rounded-md bg-brand-ink px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-black transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  Take Photo
                </button>
              </div>
              <p className="mt-4 text-xs font-semibold text-black/40 hidden sm:block">Or drag and drop images here</p>

              <input
                ref={galleryInputRef}
                type="file"
                multiple
                accept="image/*,.heic"
                className="hidden"
                onChange={handleImageChange}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
              </div>
            )}
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

      {currentFileToCropUrl && (
        <ImageCropper
          imageSrc={currentFileToCropUrl}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
