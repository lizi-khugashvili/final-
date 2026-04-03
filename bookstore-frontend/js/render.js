import { state } from "./state.js";
import { App } from "./components/App.js";

export function render() {
  const app = document.querySelector("#app");
  app.innerHTML = App(state);
}