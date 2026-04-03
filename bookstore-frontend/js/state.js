function getSavedCart() {
  const savedCart = localStorage.getItem("cart");

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart);
  } catch (error) {
    return [];
  }
}

export const state = {
  books: [],
  filteredBooks: [],
  cart: getSavedCart(),
  selectedBook: null,
  loading: false,
  error: "",
  search: "",
  genre: "All Genres",
  sort: "Default",
  toasts: [],
  isCartOpen: false,
  isCheckoutOpen: false
};

export function setState(patch) {
  Object.assign(state, patch);
}