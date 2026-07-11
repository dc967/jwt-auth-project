import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail, KeyRound } from "lucide-react";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
       
      setError(err.response?.data?.msg || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <ShieldCheck className="size-6" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back to AuthGuard</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your workspace. Secured with JWT &amp; role-based access.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/20"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" disabled={loading} className="mt-1 w-full">
                <KeyRound className="size-4" />
                {loading ? "Signing in..." : "Sign in securely"}
              </Button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2">
            <Badge className="border-primary/30 bg-primary/10 text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              JWT session
            </Badge>
            <Badge className="border-border text-muted-foreground">256-bit encryption</Badge>
          </div>
        </div>
      </div>

      <aside className="relative hidden flex-col justify-between overflow-hidden border-l border-border bg-card p-10 lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <span className="font-semibold tracking-tight">AuthGuard</span>
        </div>

        <div className="max-w-md">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            Secure access, scoped to every role.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Stateless JWT sessions with automatic refresh, fine-grained role-based access
            control, and a complete audit trail — all in one workspace.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {[
              "Short-lived access tokens with silent refresh",
              "Granular Admin, Editor & Viewer permissions",
              "Per-request authorization checks",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <ShieldCheck className="size-3" />
                </span>
                <span className="text-sm text-muted-foreground">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">© 2026 AuthGuard</p>
      </aside>
    </main>
  );
}
