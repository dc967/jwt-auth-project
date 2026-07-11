import { Check, X } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { permissionMatrix } from "../data/mockData";

const roles = ["Admin", "Editor", "Viewer"];

export function PermissionMatrix() {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="font-semibold tracking-tight">Role Permissions</h2>
        <p className="text-sm text-muted-foreground">Access granted per role across features.</p>
      </div>

      <div className="grid grid-cols-[1fr_repeat(3,3rem)] items-center gap-y-1 sm:grid-cols-[1fr_repeat(3,5rem)]">
        <div className="pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Feature</div>
        {roles.map((role) => (
          <div key={role} className="pb-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {role}
          </div>
        ))}

        {permissionMatrix.map((perm) => (
          <PermissionRow key={perm.feature} perm={perm} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">Legend:</span>
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          <Check className="size-3" /> Allowed
        </Badge>
        <Badge className="border-border text-muted-foreground">
          <X className="size-3" /> Denied
        </Badge>
      </div>
    </Card>
  );
}

function PermissionRow({ perm }) {
  return (
    <>
      <div className="border-t border-border py-3 pr-2">
        <div className="text-sm font-medium">{perm.feature}</div>
        <div className="text-xs text-muted-foreground">{perm.description}</div>
      </div>
      {roles.map((role) => (
        <div key={role} className="flex justify-center border-t border-border py-3">
          <span
            className={`flex size-6 items-center justify-center rounded-md ${
              perm.roles[role] ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground/50"
            }`}
          >
            {perm.roles[role] ? <Check className="size-3.5" /> : <X className="size-3.5" />}
          </span>
        </div>
      ))}
    </>
  );
}
