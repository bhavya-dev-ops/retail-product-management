import { Eye, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice, getWhatsAppLink } from "../utils/whatsapp.js";

export default function ProductCard({ product }) {
  const isNew = product.created_at && (new Date() - new Date(product.created_at)) / (1000 * 60 * 60 * 24) <= 7;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-red/50 hover:shadow-xl">
      <Link className="focus-ring block rounded-md" to={`/products/${product.id}`}>
        <div className="relative aspect-[5/4] overflow-hidden bg-brand-mist">
          {isNew && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-brand-red px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              New
            </span>
          )}
          <img
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            src={product.image_urls && product.image_urls[0] ? product.image_urls[0] : ""}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-md bg-brand-soft px-2 py-1 text-[11px] font-black text-brand-red">
            {product.subcategory}
          </span>
        </div>

        <Link className="focus-ring rounded-md mt-1 mb-1" to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 h-10 text-sm sm:text-base font-black text-brand-ink transition group-hover:text-brand-red">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 mb-3">
          <div className="flex h-6 items-center">
            <p className="text-sm sm:text-base font-black text-brand-ink">
              {product.show_price !== false ? formatPrice(product.price) : "Contact for Price"}
            </p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <Link
            className="focus-ring inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-md border border-black/10 bg-white px-2 sm:px-3 text-[10px] sm:text-xs font-black text-brand-ink transition hover:border-brand-red hover:text-brand-red"
            to={`/products/${product.id}`}
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Details
          </Link>
          <a
            className="focus-ring inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-md bg-brand-red px-2 sm:px-3 text-[10px] sm:text-xs font-black text-white transition hover:bg-brand-redDark"
            href={getWhatsAppLink(product)}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Inquiry
          </a>
        </div>
      </div>
    </article>
  );
}
