// Basit HTTP client
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const httpClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  },

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  },

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  },

  async delete(url: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Request failed");
  },
};
