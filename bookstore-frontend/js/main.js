import { fetchBooks } from "./api.js";
import { state, setState } from "./state.js";
import { render } from "./render.js";
import { attachEvents } from "./events.js";

function sortBooks(books) {
  const result = [...books];

  if (state.sort === "Price: Low to High") {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sort === "Price: High to Low") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

export async function loadBooks(fetchFromBackend = true) {
  try {
    setState({
      loading: true,
      error: ""
    });

    if (fetchFromBackend) {
      const books = await fetchBooks({
        search: state.search,
        genre: state.genre
      });

      setState({
        books: sortBooks(books)
      });
    } else {
      setState({
        books: sortBooks(state.books)
      });
    }
  } catch (error) {
    setState({
      error: error.message
    });
    console.error(error);
  } finally {
    setState({
      loading: false
    });

    render();
    attachEvents(loadBooks);
  }
}

render();
attachEvents(loadBooks);
loadBooks();