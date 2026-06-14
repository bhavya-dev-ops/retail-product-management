import { ArrowLeft, MessageCircle, Tag, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { formatPrice, getWhatsAppLink } from "../utils/whatsapp.js";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*").eq("id", productId).single();
      if (!error && data) {
        setProduct(data);
        setActiveImage(data.image_urls?.[0] || "");
      }
      setLoading(false);
    }
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-12 w-12 animate-spin text-brand-red" />
      </div>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-5">
        <p className="text-sm font-black uppercase text-brand-red">Product not found</p>
        <h1 className="mt-2 text-3xl font-black text-brand-ink">This pair is not available.</h1>
        <Link
          className="focus-ring mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-5 text-sm font-black text-white transition hover:bg-brand-redDark"
          to="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to store
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-5 lg:px-8">
      <Link
        className="focus-ring mb-5 inline-flex items-center gap-2 rounded-md text-sm font-black text-brand-ink transition hover:text-brand-red"
        to="/"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to collection
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <div className="overflow-hidden rounded-lg border border-black/10 bg-brand-mist shadow-sm">
            <img
              alt={product.name}
              className="aspect-[4/3] h-full w-full object-cover"
              src={activeImage}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.image_urls?.map((image) => (
              <button
                className={`focus-ring overflow-hidden rounded-lg border bg-brand-mist transition ${
                  activeImage === image ? "border-brand-red" : "border-black/10 hover:border-brand-red"
                }`}
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
              >
                <img alt="" className="aspect-[4/3] h-full w-full object-cover" src={image} />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-brand-ink px-3 py-1.5 text-xs font-black text-white">
              {product.category}
            </span>
            <span className="rounded-md bg-brand-soft px-3 py-1.5 text-xs font-black text-brand-red">
              {product.subcategory}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-black leading-tight text-brand-ink sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-6 rounded-lg border border-black/10 bg-brand-mist p-4">
            <div className="flex items-center gap-2 text-sm font-black text-black/60">
              <Tag className="h-4 w-4" />
              Price
            </div>
            <p className="mt-2 text-3xl font-black text-brand-ink">
              {product.show_price ? formatPrice(product.price) : "Contact for Price"}
            </p>
          </div>

          <a
            className="focus-ring mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-red px-5 text-sm font-black text-white transition hover:bg-brand-redDark sm:w-auto"
            href={getWhatsAppLink(product)}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
