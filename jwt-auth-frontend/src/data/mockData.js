// Same shape as the original v0 mock-data.ts — kept here so the UI
// keeps working even before the backend endpoints are wired up.

export const roleStyles = {
  Admin: "bg-primary/15 text-primary border-primary/30",
  Editor: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  Viewer: "bg-muted text-muted-foreground border-border",
};

export const statusStyles = {
  Active: "bg-primary/15 text-primary border-primary/30",
  Invited: "bg-chart-3/15 text-chart-3 border-chart-3/30",
  Suspended: "bg-destructive/15 text-destructive border-destructive/30",
};

export const mockUsers = [
  { id: "1", name: "Ava Mitchell", email: "ava.mitchell@acme.io", role: "Admin", status: "Active", lastActive: "2 min ago", initials: "AM" },
  { id: "2", name: "Liam Carter", email: "liam.carter@acme.io", role: "Editor", status: "Active", lastActive: "1 hour ago", initials: "LC" },
  { id: "3", name: "Sofia Nguyen", email: "sofia.nguyen@acme.io", role: "Editor", status: "Invited", lastActive: "Pending", initials: "SN" },
  { id: "4", name: "Marcus Reed", email: "marcus.reed@acme.io", role: "Viewer", status: "Active", lastActive: "Yesterday", initials: "MR" },
  { id: "5", name: "Priya Shah", email: "priya.shah@acme.io", role: "Viewer", status: "Suspended", lastActive: "3 days ago", initials: "PS" },
  { id: "6", name: "Noah Bennett", email: "noah.bennett@acme.io", role: "Editor", status: "Active", lastActive: "5 hours ago", initials: "NB" },
];

export const permissionMatrix = [
  { feature: "View dashboard", description: "Access analytics and overview pages", roles: { Admin: true, Editor: true, Viewer: true } },
  { feature: "Create content", description: "Add new records and documents", roles: { Admin: true, Editor: true, Viewer: false } },
  { feature: "Edit content", description: "Modify existing records", roles: { Admin: true, Editor: true, Viewer: false } },
  { feature: "Delete content", description: "Permanently remove records", roles: { Admin: true, Editor: false, Viewer: false } },
  { feature: "Manage users", description: "Invite, suspend, and assign roles", roles: { Admin: true, Editor: false, Viewer: false } },
  { feature: "Billing & settings", description: "Workspace configuration and invoices", roles: { Admin: true, Editor: false, Viewer: false } },
];
