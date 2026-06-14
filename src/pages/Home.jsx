import CategoriesSection from "../components/CategoriesSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";
import Hero from "../components/Hero.jsx";
import TrustSection from "../components/TrustSection.jsx";
import ProductGrid from "../components/ProductGrid.jsx";

export default function Home({ filter, onClearFilters, onFilterChange }) {
  return (
    <>
      <Hero onFilterChange={onFilterChange} />
      <TrustSection />
      <CategoriesSection filter={filter} onFilterChange={onFilterChange} />
      <ProductGrid
        filter={filter}
        onClearFilters={onClearFilters}
        onFilterChange={onFilterChange}
      />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}
