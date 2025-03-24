import { FiMessageCircle } from "react-icons/fi";
import { DarkThemeToggle } from "flowbite-react";
import logo from "../assets/chatBubble.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-800 text-white p-2 shadow-lg">
      <div className="mx-auto flex items-center justify-between">
        <div>
          <h1 className="ml-5 text-2xl font-bold tracking-tight flex items-center">
            <img src={logo} className="w-12"/>
            PDF Document Q&A
          </h1>
        </div>
        <DarkThemeToggle className="p-3 text-blue-300 dark:text-yellow-300" />
      </div>
    </header>
  );
};