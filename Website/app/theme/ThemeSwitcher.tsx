"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CgSun, CgMoon } from 'react-icons/cg'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      className={`w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-400 dark:bg-slate-600`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? 
        <CgMoon className="w-6 h-6 text-white  " /> :
        <CgSun className="w-6 h-6 text-yellow-400 " /> 
      }
    </button>
  );
};