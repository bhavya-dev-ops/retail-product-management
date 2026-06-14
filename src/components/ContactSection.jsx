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

        <div className="min-h-72 overflow-hidden rounded-lg border border-white/10 bg-white/10">
          <div className="flex h-full min-h-72 items-center justify-center bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0%,rgba(168,15,18,0.22)_100%)] p-5 text-center">
            <div>
              <MapPin className="mx-auto h-12 w-12 text-white" />
              <p className="mt-3 text-xl font-black">Google Maps</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/70">
                Raj Footwear location map will appear here when the store map link is added.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
