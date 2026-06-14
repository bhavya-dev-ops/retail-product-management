import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import FloatingAssistant from "./components/FloatingAssistant.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

// Admin Imports
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";
import Categories from "./pages/admin/Categories.jsx";

const defaultFilter = {
  category: "all",
  subcategory: "all",
};

export default function App() {
  const [filter, setFilter] = useState(defaultFilter);
  const navigate = useNavigate();

  function scrollToProducts() {
    window.setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function handleFilterChange(nextFilter) {
    setFilter({
      category: nextFilter.category ?? "all",
      subcategory: nextFilter.subcategory ?? "all",
    });
    navigate("/");
    scrollToProducts();
  }

  function handleClearFilters() {
    setFilter(defaultFilter);
    navigate("/");
  }

  return (
    <div className="min-h-screen text-brand-ink flex flex-col">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        {/* Storefront Routes */}
        <Route
          path="*"
          element={
            <>
              <Navbar
                filter={filter}
                onClearFilters={handleClearFilters}
                onFilterChange={handleFilterChange}
              />
              <main className="flex-1">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        filter={filter}
                        onClearFilters={handleClearFilters}
                        onFilterChange={handleFilterChange}
                      />
                    }
                  />
                  <Route path="/products/:productId" element={<ProductDetail />} />
                  <Route path="*" element={<NotFound onReset={handleClearFilters} />} />
                </Routes>
              </main>
              <Footer />
              <FloatingAssistant />
            </>
          }
        />
      </Routes>
    </div>
  );
}
