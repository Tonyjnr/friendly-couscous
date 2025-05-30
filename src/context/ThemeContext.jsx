import { useState, useEffect } from "react";
import ThemeContext from "../hooks/createContext";
import PropTypes from "prop-types";

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState("blue");

  // Load theme preferences from localStorage on initial render
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedAccentColor = localStorage.getItem("accentColor");

    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    } else {
      // Check if user prefers dark mode at system level
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }

    if (savedAccentColor) {
      setAccentColor(savedAccentColor);
    }
  }, []);

  // Save theme preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("accentColor", accentColor);

    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, accentColor]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Change accent color
  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  // Get color classes based on current theme
  const getColorClasses = (type) => {
    const colorMap = {
      blue: {
        primary: darkMode ? "bg-blue-600" : "bg-blue-600",
        hover: darkMode ? "hover:bg-blue-700" : "hover:bg-blue-700",
        text: darkMode ? "text-blue-400" : "text-blue-600",
        border: darkMode ? "border-blue-500" : "border-blue-600",
        light: darkMode ? "bg-blue-900 bg-opacity-20" : "bg-blue-50",
      },
      green: {
        primary: darkMode ? "bg-green-600" : "bg-green-600",
        hover: darkMode ? "hover:bg-green-700" : "hover:bg-green-700",
        text: darkMode ? "text-green-400" : "text-green-600",
        border: darkMode ? "border-green-500" : "border-green-600",
        light: darkMode ? "bg-green-900 bg-opacity-20" : "bg-green-50",
      },
      purple: {
        primary: darkMode ? "bg-purple-600" : "bg-purple-600",
        hover: darkMode ? "hover:bg-purple-700" : "hover:bg-purple-700",
        text: darkMode ? "text-purple-400" : "text-purple-600",
        border: darkMode ? "border-purple-500" : "border-purple-600",
        light: darkMode ? "bg-purple-900 bg-opacity-20" : "bg-purple-50",
      },
      pink: {
        primary: darkMode ? "bg-pink-600" : "bg-pink-600",
        hover: darkMode ? "hover:bg-pink-700" : "hover:bg-pink-700",
        text: darkMode ? "text-pink-400" : "text-pink-600",
        border: darkMode ? "border-pink-500" : "border-pink-600",
        light: darkMode ? "bg-pink-900 bg-opacity-20" : "bg-pink-50",
      },
      amber: {
        primary: darkMode ? "bg-amber-600" : "bg-amber-600",
        hover: darkMode ? "hover:bg-amber-700" : "hover:bg-amber-700",
        text: darkMode ? "text-amber-400" : "text-amber-600",
        border: darkMode ? "border-amber-500" : "border-amber-600",
        light: darkMode ? "bg-amber-900 bg-opacity-20" : "bg-amber-50",
      },
    };

    return colorMap[accentColor][type] || colorMap.blue[type];
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        accentColor,
        toggleDarkMode,
        changeAccentColor,
        getColorClasses,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
