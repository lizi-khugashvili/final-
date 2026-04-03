export function ToastContainer(toasts = []) {
  return `
    <div class="toast-container">
      ${toasts.map(toast => `
        <div class="toast-item">${toast.text}</div>
      `).join("")}
    </div>
  `;
}