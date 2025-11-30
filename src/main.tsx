import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import { TooltipProvider } from "@/components/ui/tooltip"; // Import TooltipProvider
import { Toaster as Sonner } from "@/components/ui/sonner"; // Import Sonner

const queryClient = new QueryClient(); // Initialize QueryClient

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <App />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);