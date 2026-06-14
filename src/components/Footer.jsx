import { Instagram, LockKeyhole, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import {
  STORE_ADDRESS,
  STORE_PHONE_DISPLAY,
  getWhatsAppLink,
} from "../utils/whatsapp.js";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-7 px-4 py-8 sm:px-5 md:grid-cols-[1.1fr_0.9fr_0.7fr] lg:px-8">
        <div>
          <Link className="focus-ring inline-flex items-center gap-3 rounded-md" to="/">
            <img
              alt="Raj Footwear logo"
              className="h-14 w-14 rounded-full border border-brand-red/30 object-cover"
              src="/logo.png"
            />
            <span>
              <span className="block text-lg font-black uppercase text-brand-ink">Raj Footwear</span>
              <span className="block text-xs font-bold text-brand-red">
                Sabsa Sasta Sabka Liye
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-black/60">
            Modern footwear collection for men, women, and kids from Romi Or Bunty Ki Dukan.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase text-brand-ink">Contact</h3>
          <p className="mt-3 text-sm leading-6 text-black/60">{STORE_ADDRESS}</p>
          <a
            className="focus-ring mt-3 inline-flex items-center gap-2 rounded-md text-sm font-bold text-brand-ink hover:text-brand-red"
            href="tel:+919876543210"
          >
            <Phone className="h-4 w-4" />
            {STORE_PHONE_DISPLAY}
          </a>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase text-brand-ink">Social</h3>
          <div className="mt-3 flex gap-2">
            <a
              aria-label="Instagram"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-md border border-black/10 text-brand-ink transition hover:border-brand-red hover:text-brand-red"
              href="https://www.instagram.com/rajfo.ot/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              aria-label="WhatsApp"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-md border border-black/10 text-brand-ink transition hover:border-brand-red hover:text-brand-red"
              href={getWhatsAppLink()}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
          <Link
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md text-xs font-bold text-black/40 transition hover:text-brand-red"
            to="/admin/login"
          >
            <LockKeyhole className="h-3.5 w-3.5" />
            Admin Login
          </Link>
        </div>
      </div>
      <div className="border-t border-black/10 px-4 py-4 text-center text-xs text-black/40">
        © 2026 Raj Footwear. All rights reserved.
      </div>
    </footer>
  );
}
