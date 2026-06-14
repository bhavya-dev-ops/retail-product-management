import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  const [session, setSession] = useState(undefined);
  useState(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  if (session) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Using email instead of username, Supabase auth generally uses email
    // The user requested "Username: RajFootwear". We can map this to an email internally 
    // like "admin@rajfootwear.com" or just use the email directly if configured in Supabase.
    // For simplicity with default Supabase auth, we'll use email here but label it "Username / Email"
    // To literally support just "Username", Supabase allows it in settings, but email is standard.
    
    // We'll treat the input as email since Supabase auth signInWithPassword expects email/phone.
    let loginEmail = email;
    if (email === "RajFootwear") {
        loginEmail = "admin@rajfootwear.com"; // Map username to email for standard supabase setup
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/admin/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-mist px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-black/10 bg-white p-8 shadow-premium">
        <div className="text-center">
          <img alt="Raj Footwear logo" className="mx-auto h-16 w-16 rounded-full border border-brand-red/30 object-cover" src="/logo.png" />
          <h2 className="mt-6 text-3xl font-black text-brand-ink">Admin Login</h2>
          <p className="mt-2 text-sm text-black/60">Secure access to Raj Footwear dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-md bg-brand-soft p-4 text-sm font-semibold text-brand-red">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="email-address">Username or Email</label>
              <input
                id="email-address"
                name="email"
                type="text"
                required
                className="focus-ring relative block w-full rounded-md border border-black/10 px-3 py-2 text-brand-ink placeholder-black/40 focus:z-10 focus:border-brand-red focus:outline-none"
                placeholder="Username (e.g. RajFootwear) or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="focus-ring relative block w-full rounded-md border border-black/10 px-3 py-2 text-brand-ink placeholder-black/40 focus:z-10 focus:border-brand-red focus:outline-none pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-black/40 hover:text-brand-ink"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="focus-ring group relative flex w-full justify-center rounded-md border border-transparent bg-brand-red px-4 py-2.5 text-sm font-black text-white hover:bg-brand-redDark focus:outline-none disabled:opacity-50"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-white/50 group-hover:text-white/70" />
              </span>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in to Dashboard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
