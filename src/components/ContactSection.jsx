import { MapPin, MessageCircle, Phone } from "lucide-react";
import {
  STORE_ADDRESS,
  STORE_PHONE_DISPLAY,
  getWhatsAppLink,
} from "../utils/whatsapp.js";

export default function ContactSection() {
  return (
    <section className="bg-brand-ink py-10 text-white" id="contact">
      <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-5 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-xs font-black uppercase text-white/70">Visit Raj Footwear</p>
          <h2 className="mt-1 text-2xl font-black sm:text-3xl">Contact and location</h2>
          <div className="mt-5 space-y-3">
            <div className="flex gap-3 rounded-lg border border-white/10 bg-white/10 p-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-red" />
              <p className="text-sm leading-6 text-white/80">{STORE_ADDRESS}</p>
            </div>
            <div className="flex gap-3 rounded-lg border border-white/10 bg-white/10 p-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-red" />
              <a className="focus-ring rounded-md text-sm font-bold text-white" href="tel:+918445175914">
                {STORE_PHONE_DISPLAY}
              </a>
            </div>
            <a
              className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-red px-5 text-sm font-black text-white transition hover:bg-brand-redDark"
              href={getWhatsAppLink()}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <a
          href="https://maps.app.goo.gl/xv3QK8nLVN18pRzX9"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block min-h-72 overflow-hidden rounded-lg border border-white/10 focus-ring"
        >
          <img
            src="/shop-front.jpg"
            alt="Raj Footwear Shop Front"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 transition-colors group-hover:bg-black/50" />
          <div className="relative flex h-full min-h-72 flex-col items-center justify-center p-5 text-center text-white">
            <MapPin className="mb-2 h-10 w-10 text-brand-red transition-transform duration-500 group-hover:scale-110" />
            <p className="text-2xl font-black tracking-tight">Raj Footwear</p>
            <p className="mt-1 text-sm font-medium text-white/90">Jawahar Ganj, Gangoh</p>
            <span className="mt-4 inline-flex rounded-full bg-brand-red/90 px-5 py-2 text-sm font-bold text-white backdrop-blur-md transition-colors group-hover:bg-brand-red">
              Visit Our Store
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
