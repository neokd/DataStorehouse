import { useEffect, useState } from 'react';

function useTheme() {
  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme ? storedTheme : 'dark';
  const [theme, setTheme] = useState(initialTheme);
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.add(theme);
    rootElement.classList.remove(nextTheme);

    localStorage.setItem('theme', theme);
  }, [theme, nextTheme]);

  return [nextTheme, setTheme];
}

export default useTheme;
