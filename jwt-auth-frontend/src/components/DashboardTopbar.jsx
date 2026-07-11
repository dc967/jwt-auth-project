import { Search, Bell, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function DashboardTopbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-card/40 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <ShieldCheck className="size-5" />
        </div>
        <span className="font-semibold tracking-tight">AuthGuard</span>
      </div>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search users, roles, permissions..."
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:flex">
          <span className="size-1.5 rounded-full bg-primary" />
          Session active
        </span>
        <button className="relative flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
        </button>
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
          {user?.initials || "U"}
        </div>
      </div>
    </header>
  );
}
