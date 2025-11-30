import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
// Removed: import { ThemeProvider } from "./components/ThemeProvider.tsx"; // Import ThemeProvider

createRoot(document.getElementById("root")!).render(
  // Removed: <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <App />
  // Removed: </ThemeProvider>
);