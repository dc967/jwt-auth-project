import { ShieldCheck, LayoutDashboard, Users, KeySquare, ScrollText, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: false },
  { label: "Users", icon: Users, active: true },
  { label: "Roles & Permissions", icon: KeySquare, active: false },
  { label: "Audit Log", icon: ScrollText, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <ShieldCheck className="size-5" />
        </div>
        <span className="font-semibold tracking-tight">AuthGuard</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              item.active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <item.icon className="size-4" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
            {user?.initials || "U"}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium">{user?.name || "User"}</span>
            <span className="truncate text-xs text-muted-foreground">{user?.role || "Viewer"}</span>
          </div>
          <button onClick={handleLogout} title="Logout">
            <LogOut className="size-4 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>
    </aside>
  );
}
