const API = "http://localhost:8080/api/auth";

export async function login(email, password) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API}/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return await res.json();
}

export async function logout() {
  await fetch(`${API}/logout`, {
    method: "POST",
    credentials: "include",
  });
}


export async function register(email, password) {
    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Registro fallido");
    return await res.json();
  }
  