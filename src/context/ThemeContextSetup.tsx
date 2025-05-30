import { createContext, useContext } from "react";

// Define the color type
type ColorType = "primary" | "hover" | "text" | "border" | "light";

// Define the theme context type
export interface ThemeContextType {
  darkMode: boolean;
  accentColor: string;
  toggleDarkMode: () => void;
  changeAccentColor: (color: string) => void;
  getColorClasses: (type: ColorType) => string;
}

// Create the theme context with initial values
export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  accentColor: "blue",
  toggleDarkMode: () => {
    console.warn("ThemeContext not yet initialized");
  },
  changeAccentColor: () => {
    console.warn("ThemeContext not yet initialized");
  },
  getColorClasses: () => {
    console.warn("ThemeContext not yet initialized");
    return "";
  },
});

// Custom hook for using theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
