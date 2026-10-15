import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../feature/cartSlice";

// Safe persistence loader
const loadState = () => {
  try {
    const data = localStorage.getItem("appState");
    if (!data) return undefined;
    return JSON.parse(data);
  } catch {
    return undefined;
  }
};

// Safe persistence saver
const saveState = (state) => {
  try {
    if (state?.cart) {
      localStorage.setItem("appState", JSON.stringify({ cart: state.cart }));
    }
  } catch {
    // Ignore localStorage write errors
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadState(),
  devTools: import.meta.env.DEV,
});

// Debounced persistence
let timeout;
store.subscribe(() => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveState(store.getState());
  }, 300);
});

export default store;
