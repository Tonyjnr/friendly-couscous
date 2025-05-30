import React from 'react';
import { useThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode, accentColor, changeAccentColor } = useThemeContext();

  const colorOptions = [
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Purple', value: 'purple' },
    { name: 'Pink', value: 'pink' },
    { name: 'Amber', value: 'amber' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-10 flex flex-col items-end space-y-2">
      {/* Theme color selector */}
      <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex space-x-1">
        {colorOptions.map(color => (
          <button
            key={color.value}
            onClick={() => changeAccentColor(color.value)}
            className={`w-6 h-6 rounded-full transition-transform duration-200 ${
              accentColor === color.value ? 'transform scale-110 ring-2 ring-offset-2 ring-gray-400' : ''
            }`}
            style={{ 
              backgroundColor: 
                color.value === 'blue' ? '#3b82f6' : 
                color.value === 'green' ? '#22c55e' : 
                color.value === 'purple' ? '#a855f7' : 
                color.value === 'pink' ? '#ec4899' : 
                '#f59e0b' 
            }}
            title={color.name}
            aria-label={`Switch to ${color.name} theme`}
          />
        ))}
      </div>
      
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;