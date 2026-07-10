import { useEffect, useState } from "react";
import { Users, ShieldCheck, KeySquare, Clock } from "lucide-react";
import { Card } from "./Card";
import { fetchStats } from "../api/users";

const fallbackStats = [
  { label: "Total Users", value: "1,248", delta: "+12 this week", icon: "Users" },
  { label: "Active Sessions", value: "327", delta: "Live now", icon: "ShieldCheck" },
  { label: "Defined Roles", value: "3", delta: "Admin · Editor · Viewer", icon: "KeySquare" },
  { label: "Avg. Token TTL", value: "15m", delta: "Auto-refresh on", icon: "Clock" },
];

const iconMap = { Users, ShieldCheck, KeySquare, Clock };

export function StatCards() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    fetchStats()
      .then((data) => setStats(data))
      .catch(() => setStats(fallbackStats)); // backend abhi nahi hai to mock dikhao
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] || Users;
        return (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">{stat.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{stat.delta}</div>
          </Card>
        );
      })}
    </div>
  );
}
