import { DashboardSidebar } from "../components/DashboardSidebar";
import { DashboardTopbar } from "../components/DashboardTopbar";
import { StatCards } from "../components/StatCards";
import { UsersTable } from "../components/UsersTable";
import { PermissionMatrix } from "../components/PermissionMatrix";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar />
        <main className="flex-1 space-y-6 p-4 pb-20 lg:p-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">User Management</h1>
            <p className="text-sm text-muted-foreground">
              Control who has access and what they can do across your workspace.
            </p>
          </div>

          <StatCards />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
            <UsersTable />
            <PermissionMatrix />
          </div>
        </main>
      </div>
    </div>
  );
}
