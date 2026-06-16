import { Instagram, LockKeyhole, MessageCircle, Phone, MapPin, ChevronRight, Clock, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { getWhatsAppLink } from "../utils/whatsapp.js";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-black/10 bg-white pt-12 pb-6">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Column 1: About Raj Footwear */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              alt="Raj Footwear logo"
              className="h-12 w-12 rounded-full border border-brand-red/30 object-cover"
              src="/logo.png"
            />
            <div>
              <h3 className="text-lg font-black uppercase text-brand-ink">Raj Footwear</h3>
              <p className="text-xs font-bold text-brand-red">Romi Or Bunty Ki Dukan</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-black/70">
            <p className="font-semibold text-brand-ink italic">"Sabse Sasta Sabke Liye"</p>
            <p>Serving Gangoh for 35+ Years with quality footwear for the entire family.</p>
          </div>
          <Link
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-md text-xs font-bold text-black/40 transition hover:text-brand-red"
            to="/admin/login"
          >
            <LockKeyhole className="h-3.5 w-3.5" />
            Admin Login
          </Link>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-sm font-black uppercase text-brand-ink mb-5 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-1/2 after:bg-brand-red">Quick Links</h3>
          <ul className="space-y-3 text-sm text-black/70">
            <li>
              <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-brand-red transition-colors w-fit focus-ring rounded-sm">
                <ChevronRight className="h-4 w-4 text-brand-red/70" />
                Home
              </button>
            </li>
            <li>
              <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-brand-red transition-colors w-fit focus-ring rounded-sm">
                <ChevronRight className="h-4 w-4 text-brand-red/70" />
                Men Collection
              </button>
            </li>
            <li>
              <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-brand-red transition-colors w-fit focus-ring rounded-sm">
                <ChevronRight className="h-4 w-4 text-brand-red/70" />
                Women Collection
              </button>
            </li>
            <li>
              <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-brand-red transition-colors w-fit focus-ring rounded-sm">
                <ChevronRight className="h-4 w-4 text-brand-red/70" />
                Kids Collection
              </button>
            </li>
            <li>
              <a href="#contact" className="flex items-center gap-2 hover:text-brand-red transition-colors w-fit focus-ring rounded-sm">
                <ChevronRight className="h-4 w-4 text-brand-red/70" />
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Store Information */}
        <div>
          <h3 className="text-sm font-black uppercase text-brand-ink mb-5 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-1/2 after:bg-brand-red">Store Information</h3>
          <ul className="space-y-4 text-sm text-black/70">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-brand-red mt-0.5" />
              <span>Jawahar Ganj, Gangoh, Saharanpur, Uttar Pradesh</span>
            </li>
            <li className="flex gap-3 items-center">
              <Clock className="h-4 w-4 shrink-0 text-brand-red" />
              <span>Open Daily: 9:00 AM - 9:00 PM</span>
            </li>
            <li className="flex gap-3 items-center">
              <Store className="h-4 w-4 shrink-0 text-brand-red" />
              <span>Wholesale & Retail Footwear</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="h-4 w-4 shrink-0 text-brand-red" />
              <a href="tel:+918445175914" className="hover:text-brand-red transition-colors focus-ring rounded-sm">
                Phone: +91 8445175914
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Social & Contact */}
        <div>
          <h3 className="text-sm font-black uppercase text-brand-ink mb-5 relative inline-block after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-1/2 after:bg-brand-red">Connect With Us</h3>
          <div className="flex flex-col gap-3 text-sm">
            <a
              className="flex items-center gap-3 rounded-lg border border-black/10 bg-gray-50 p-3 text-black/80 transition-all hover:bg-brand-red hover:text-white hover:border-brand-red focus-ring group"
              href="https://www.instagram.com/rajfo.ot/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram className="h-5 w-5 text-brand-ink group-hover:text-white transition-colors" />
              <span className="font-semibold">Instagram</span>
            </a>
            <a
              className="flex items-center gap-3 rounded-lg border border-black/10 bg-gray-50 p-3 text-black/80 transition-all hover:bg-green-600 hover:text-white hover:border-green-600 focus-ring group"
              href={getWhatsAppLink()}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-5 w-5 text-brand-ink group-hover:text-white transition-colors" />
              <span className="font-semibold">WhatsApp</span>
            </a>
            <a
              className="flex items-center gap-3 rounded-lg border border-black/10 bg-gray-50 p-3 text-black/80 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 focus-ring group"
              href="https://maps.app.goo.gl/xv3QK8nLVN18pRzX9"
              rel="noreferrer"
              target="_blank"
            >
              <MapPin className="h-5 w-5 text-brand-ink group-hover:text-white transition-colors" />
              <span className="font-semibold">Google Maps Location</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Divider */}
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-5 lg:px-8">
        <div className="border-t border-black/10 pt-6 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-sm text-black/60 font-medium">
            © 2026 Raj Footwear. All Rights Reserved.
          </p>
          <p className="text-xs text-black/50">
            Serving Gangoh Since 1989 | Wholesale & Retail Footwear Store
          </p>
        </div>
      </div>
    </footer>
  );
}
