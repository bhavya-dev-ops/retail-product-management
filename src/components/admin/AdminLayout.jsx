import { Loader2, LogOut, Package, PlusCircle, LayoutDashboard, List } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Add Product", href: "/admin/add-product", icon: PlusCircle },
  { name: "Manage Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: List },
];

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-mist">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-brand-mist">
      {/* Sidebar */}
      <aside className="w-64 flex-col border-r border-black/10 bg-white hidden md:flex">
        <div className="flex h-20 items-center gap-3 border-b border-black/10 px-6">
          <img alt="Raj Footwear Logo" className="h-10 w-10 rounded-full border border-brand-red/30 object-cover" src="/logo.png" />
          <span className="text-base font-black uppercase text-brand-ink">Admin Panel</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-brand-red text-white"
                    : "text-brand-ink hover:bg-brand-soft"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-black/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-red hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
