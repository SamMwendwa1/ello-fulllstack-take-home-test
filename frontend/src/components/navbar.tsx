import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import ThemeSwitcher from "./theme-switcher";

export const Navbar = () => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleTogleMobileMenu = () => {
    setToggleMobileMenu(!toggleMobileMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setToggleMobileMenu(false);
    }
  };

  const handleMenuItemClick = () => {
    setToggleMobileMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-10 right-0 flex justify-between items-center py-5 md:px-20 px-4 border-b border-b-[#0b1c22] dark:border-b-white bg-inherit">
      <h1 className="md:text-3xl text-2xl font-extrabold cursor-pointer hover:scale-105 text-[#28B8B8] dark:text-[#CFFAFA]">
        <a href="/">ELLO</a>
      </h1>
      <h3 className="lg:text-xl text-md xxs:block hidden text-center">
        Engineering Challenge
      </h3>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <div
          className="text-2xl flex items-center md:hidden"
          onClick={handleTogleMobileMenu}
        >
          <MenuIcon
            fontSize="inherit"
            className="cursor-pointer hover:scale-125"
          />
        </div>
      </div>
      <div
        ref={menuRef}
        className={`fixed z-10 top-0 right-0 w-[60%] h-full bg-white dark:bg-[#0b1c22] border-l border-l-[#0b1c22] dark:border-l-white transition-transform duration-500 ${
          toggleMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-7">
            <ThemeSwitcher />
            <div
              className="text-2xl flex items-center"
              onClick={handleTogleMobileMenu}
            >
              <CloseIcon
                fontSize="inherit"
                className="cursor-pointer hover:scale-125"
              />
            </div>
          </div>
          <ul className="pl-3 uppercase">
            <li
              className="py-4 border-b border-b-[#0b1c22] dark:border-b-gray-300 hover:scale-[101%] cursor-pointer hover:animate-pulse hover:text-[#4AA068]"
              onClick={handleMenuItemClick}
            >
              <a href="https://www.samuelmwendwa.tech/">My Portfolio</a>
            </li>
            <li
              className="py-4 border-b border-b-[#0b1c22] dark:border-b-gray-300 hover:scale-[101%] cursor-pointer hover:animate-pulse hover:text-[#4AA068]"
              onClick={handleMenuItemClick}
            >
              <a href="https://github.com/SamMwendwa1">My Github</a>
            </li>
            <li
              className="py-4 border-b border-b-[#0b1c22] dark:border-b-gray-300 hover:scale-[101%] cursor-pointer hover:animate-pulse hover:text-[#4AA068]"
              onClick={handleMenuItemClick}
            >
              <a href="https://www.linkedin.com/in/samuel-mwendwa-06b99b23b/">
                My LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
