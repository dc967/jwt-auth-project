import { useEffect, useState } from "react";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { fetchUsers } from "../api/users";
import { mockUsers, roleStyles, statusStyles } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

export function UsersTable() {
  const [users, setUsers] = useState(mockUsers);
  const { hasRole } = useAuth();

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch(() => setUsers(mockUsers)); // backend abhi nahi hai to mock dikhao
  }, []);

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold tracking-tight">Team Members</h2>
          <p className="text-sm text-muted-foreground">Manage roles and access for your workspace.</p>
        </div>
        {/* Sirf Admin ko "Invite user" button dikhega — RBAC frontend pe bhi */}
        {hasRole("Admin") && (
          <Button className="self-start sm:self-auto">
            <UserPlus className="size-4" />
            Invite user
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">Last active</th>
              <th className="w-12 px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                      {user.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <Badge className={roleStyles[user.role]}>{user.role}</Badge>
                </td>
                <td className="px-5 py-3">
                  <Badge className={statusStyles[user.status]}>
                    <span className="size-1.5 rounded-full bg-current" />
                    {user.status}
                  </Badge>
                </td>
                <td className="hidden px-5 py-3 text-muted-foreground md:table-cell">{user.lastActive}</td>
                <td className="px-5 py-3">
                  {hasRole("Admin") && (
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="size-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
