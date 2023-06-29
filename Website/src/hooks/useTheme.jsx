// Import necessary components and libraries
import { useEffect, useState } from 'react';

/**
 * Custom hook to toggle theme of the website using localStorage
 * @category Custom Hook
 * @module useTheme
 * @function useTheme
 * @description This hook is used to toggle the theme of the website.
 * @returns [nextTheme, setTheme] - The next theme and the function to set the theme
*/
function useTheme() {
  // State to hold the theme
  const storedTheme = localStorage.getItem('theme');
  // To check if the theme is stored in localStorage
  const initialTheme = storedTheme ? storedTheme : 'dark';
  // State to hold the theme
  const [theme, setTheme] = useState(initialTheme)
  // To get the next theme
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  // Using useEffect to set the theme and toggle
  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.add(theme);
    rootElement.classList.remove(nextTheme);

    localStorage.setItem('theme', theme);
  }, [theme, nextTheme]);

  return [nextTheme, setTheme];
}

export default useTheme;
