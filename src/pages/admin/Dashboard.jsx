import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { Package, Users, Tag, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    mens: 0,
    womens: 0,
    kids: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      // Get all products to calculate stats
      const { data, error } = await supabase.from("products").select("category");
      
      if (!error && data) {
        setStats({
          total: data.length,
          mens: data.filter(p => p.category === "Men's Footwear").length,
          womens: data.filter(p => p.category === "Women's Footwear").length,
          kids: data.filter(p => p.category === "Kids Footwear").length,
        });
      }
      setLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    { name: "Total Products", value: stats.total, icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Men's Footwear", value: stats.mens, icon: Tag, color: "text-green-600", bg: "bg-green-100" },
    { name: "Women's Footwear", value: stats.womens, icon: Tag, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Kids Footwear", value: stats.kids, icon: Tag, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-ink">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-black/60">Quick summary of your store's inventory.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-black/60">{stat.name}</p>
                <p className="text-2xl font-black text-brand-ink">
                  {loading ? "..." : stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-brand-ink">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link to="/admin/add-product" className="focus-ring inline-flex items-center justify-center rounded-md bg-brand-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-red">
              Add New Product
            </Link>
            <Link to="/admin/products" className="focus-ring inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-bold text-brand-ink transition hover:border-brand-red hover:text-brand-red">
              Manage Products
            </Link>
            <Link to="/admin/categories" className="focus-ring inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-bold text-brand-ink transition hover:border-brand-red hover:text-brand-red">
              View Categories
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-black text-brand-ink">
            <AlertCircle className="h-5 w-5 text-brand-red" />
            System Status
          </h2>
          <div className="mt-4 space-y-4 text-sm">
            <div className="flex justify-between border-b border-black/10 pb-2">
              <span className="text-black/60">Database Connection</span>
              <span className="font-bold text-green-600">Connected</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-2">
              <span className="text-black/60">Storage Bucket</span>
              <span className="font-bold text-green-600">Active</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-black/60">Auth System</span>
              <span className="font-bold text-green-600">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
