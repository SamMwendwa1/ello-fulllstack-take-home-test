import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <IconButton
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none text-[#28B8B8] dark:text-[#CFFAFA] hover:!scale-125"
    >
      {darkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeSwitcher;
