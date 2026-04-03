import { Header } from "./Header.js";
import { Hero } from "./Hero.js";
import { Toolbar } from "./Toolbar.js";
import { BookGrid } from "./BookGrid.js";
import { BookModal } from "./BookModal.js";
import { CartDrawer } from "./CartDrawer.js";
import { ToastContainer } from "./ToastContainer.js";
import { CheckoutModal } from "./CheckoutModal.js";

export function App(state) {
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return `
    <div class="app-shell">
      ${Header(cartCount)}
      ${Hero(state.books.length)}
      ${Toolbar({
        search: state.search,
        genre: state.genre,
        sort: state.sort
      })}
      ${BookGrid({
        books: state.books,
        loading: state.loading,
        error: state.error
      })}
      ${BookModal(state.selectedBook)}
      ${CartDrawer(state.cart, state.isCartOpen)}
      ${ToastContainer(state.toasts)}
      ${CheckoutModal(state.cart, state.isCheckoutOpen)}
    </div>
  `;
}