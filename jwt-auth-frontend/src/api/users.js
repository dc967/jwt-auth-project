import api from "./axios";

export async function fetchUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function fetchStats() {
  const { data } = await api.get("/stats");
  return data;
}

export async function inviteUser(email, role) {
  const { data } = await api.post("/users/invite", { email, role });
  return data;
}

export async function updateUserRole(userId, role) {
  const { data } = await api.patch(`/users/${userId}/role`, { role });
  return data;
}

export async function updateUserStatus(userId, status) {
  const { data } = await api.patch(`/users/${userId}/status`, { status });
  return data;
}
