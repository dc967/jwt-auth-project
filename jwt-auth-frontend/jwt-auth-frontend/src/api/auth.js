import api from "./axios";

export async function loginUser(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  return data; // { accessToken, refreshToken, user }
}

export async function registerUser(name, email, password) {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
}

export async function logoutUser() {
  const refreshToken = localStorage.getItem("refreshToken");
  await api.post("/auth/logout", { refreshToken }); // ← yeh add karo
}

export async function fetchCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data;
}
