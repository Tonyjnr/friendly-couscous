import { createContext } from "react";

export const ThemeContext = createContext({
  darkMode: false,
  accentColor: "blue",
  toggleDarkMode: () => {},
  changeAccentColor: () => {},
  getColorClasses: () => "",
});
