import { state, setState } from "./state.js";
import { createOrder } from "./api.js";

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(state.cart));
}

function showToast(text) {
  const newToast = {
    id: Date.now(),
    text
  };

  setState({
    toasts: [...state.toasts, newToast]
  });

  setTimeout(() => {
    setState({
      toasts: state.toasts.filter(toast => toast.id !== newToast.id)
    });
  }, 2500);
}

function addToCart(bookId) {
  const book = state.books.find(item => item.id === bookId);

  if (!book) return;

  const existingItem = state.cart.find(item => item.id === bookId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      id: book.id,
      title: book.title,
      price: book.price,
      quantity: 1,
      coverEmoji: book.coverEmoji || "📘"
    });
  }

  saveCart();
  showToast("Book added to cart");
}

function increaseQuantity(bookId) {
  const existingItem = state.cart.find(item => item.id === bookId);

  if (!existingItem) return;

  existingItem.quantity += 1;
  saveCart();
}

function decreaseQuantity(bookId) {
  const existingItem = state.cart.find(item => item.id === bookId);

  if (!existingItem) return;

  existingItem.quantity -= 1;

  if (existingItem.quantity <= 0) {
    setState({
      cart: state.cart.filter(item => item.id !== bookId)
    });
    showToast("Item removed");
  }

  saveCart();
}

function removeFromCart(bookId) {
  setState({
    cart: state.cart.filter(item => item.id !== bookId)
  });

  saveCart();
  showToast("Item removed");
}

function getCartTotal() {
  return state.cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

export function attachEvents(loadBooks) {
  const cartButton = document.querySelector("#openCartBtn");
  const closeCartBtn = document.querySelector("#closeCartBtn");
  const cartOverlay = document.querySelector("#cartOverlay");
  const checkoutBtn = document.querySelector("#checkoutBtn");

  const searchInput = document.querySelector("#searchInput");
  const genreSelect = document.querySelector("#genreSelect");
  const sortSelect = document.querySelector("#sortSelect");
  const resetBtn = document.querySelector("#resetBtn");
  const emptyResetBtn = document.querySelector("#emptyResetBtn");

  const detailsButtons = document.querySelectorAll("[data-details-id]");
  const addCartButtons = document.querySelectorAll("[data-add-cart-id]");

  const closeModalBtn = document.querySelector("#closeModalBtn");
  const closeModalBtnSecondary = document.querySelector("#closeModalBtnSecondary");
  const modalOverlay = document.querySelector("#modalOverlay");

  const increaseButtons = document.querySelectorAll("[data-increase-id]");
  const decreaseButtons = document.querySelectorAll("[data-decrease-id]");
  const removeButtons = document.querySelectorAll("[data-remove-id]");

  const closeCheckoutBtn = document.querySelector("#closeCheckoutBtn");
  const checkoutOverlay = document.querySelector("#checkoutOverlay");
  const checkoutForm = document.querySelector("#checkoutForm");

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      setState({
        isCartOpen: true
      });

      loadBooks(false);
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      setState({
        isCartOpen: false
      });

      loadBooks(false);
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", (event) => {
      if (event.target.id === "cartOverlay") {
        setState({
          isCartOpen: false
        });

        loadBooks(false);
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      setState({
        isCheckoutOpen: true
      });

      loadBooks(false);
    });
  }

  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener("click", () => {
      setState({
        isCheckoutOpen: false
      });

      loadBooks(false);
    });
  }

  if (checkoutOverlay) {
    checkoutOverlay.addEventListener("click", (event) => {
      if (event.target.id === "checkoutOverlay") {
        setState({
          isCheckoutOpen: false
        });

        loadBooks(false);
      }
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const customerName = document.querySelector("#customerName").value.trim();
      const customerEmail = document.querySelector("#customerEmail").value.trim();
      const customerPhone = document.querySelector("#customerPhone").value.trim();

      if (!customerName) {
        alert("Please enter your name");
        return;
      }

      try {
        await createOrder({
          customerName,
          customerEmail,
          customerPhone,
          totalPrice: getCartTotal(),
          items: state.cart.map(item => ({
            bookId: item.id,
            quantity: item.quantity,
            unitPrice: item.price
          }))
        });

        setState({
          cart: [],
          isCheckoutOpen: false,
          isCartOpen: false
        });

        saveCart();
        showToast("Checkout request sent");
        loadBooks(false);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    setState({
      search: event.target.value
    });
  });

  searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      await loadBooks(true);
    }
  });
}

  if (genreSelect) {
    genreSelect.addEventListener("change", async (event) => {
      setState({
        genre: event.target.value
      });

      await loadBooks(true);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", async (event) => {
      setState({
        sort: event.target.value
      });

      await loadBooks(false);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      setState({
        search: "",
        genre: "All Genres",
        sort: "Default"
      });

      await loadBooks(true);
    });
  }

  if (emptyResetBtn) {
  emptyResetBtn.addEventListener("click", async () => {
    setState({
      search: "",
      genre: "All Genres",
      sort: "Default"
    });

    await loadBooks(true);
  });
}

  detailsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.detailsId);
      const foundBook = state.books.find(book => book.id === id);

      setState({
        selectedBook: foundBook || null
      });

      loadBooks(false);
    });
  });

  addCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.addCartId);

      addToCart(id);

      setState({
        isCartOpen: true
      });

      loadBooks(false);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      setState({
        selectedBook: null
      });

      loadBooks(false);
    });
  }

  if (closeModalBtnSecondary) {
    closeModalBtnSecondary.addEventListener("click", () => {
      setState({
        selectedBook: null
      });

      loadBooks(false);
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (event) => {
      if (event.target.id === "modalOverlay") {
        setState({
          selectedBook: null
        });

        loadBooks(false);
      }
    });
  }

  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.increaseId);
      increaseQuantity(id);
      loadBooks(false);
    });
  });

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.decreaseId);
      decreaseQuantity(id);
      loadBooks(false);
    });
  });

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.removeId);
      removeFromCart(id);
      loadBooks(false);
    });
  });
}