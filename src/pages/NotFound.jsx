import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound({ onReset }) {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-5">
      <p className="text-sm font-black uppercase text-brand-red">404</p>
      <h1 className="mt-2 text-3xl font-black text-brand-ink">Page not found.</h1>
      <p className="mt-3 text-sm leading-6 text-black/60">
        The storefront page you are looking for is not available.
      </p>
      <Link
        className="focus-ring mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-5 text-sm font-black text-white transition hover:bg-brand-redDark"
        to="/"
        onClick={onReset}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Raj Footwear
      </Link>
    </section>
  );
}
