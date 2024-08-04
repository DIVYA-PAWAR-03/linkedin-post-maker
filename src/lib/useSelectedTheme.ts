import { create } from "zustand";

interface SelectedThemeState {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

// Function to load the theme from localStorage
const loadFromStorage = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("activePostTheme") || "black-diamond";
  }
  return "black-diamond"; // Default theme if localStorage is not available
};

// Create the Zustand store
export const useSelectedTheme = create<SelectedThemeState>((set) => ({
  selectedTheme: loadFromStorage(),
  setSelectedTheme: (theme) => {
    set({ selectedTheme: theme });
    if (typeof window !== "undefined") {
      localStorage.setItem("activePostTheme", theme);
    }
  },
}));
