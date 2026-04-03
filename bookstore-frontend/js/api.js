const API_BASE = "http://localhost:3000/api/books";

export async function fetchBooks({ search = "", genre = "All Genres" } = {}) {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.append("search", search.trim());
  }

  if (genre !== "All Genres") {
    params.append("genre", genre);
  }

  const url = params.toString()
    ? `${API_BASE}?${params.toString()}`
    : API_BASE;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return await response.json();
}

export async function createOrder(payload) {
  const response = await fetch("http://localhost:3000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return await response.json();
}