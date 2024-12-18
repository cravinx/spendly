import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiCurrencyFill } from "react-icons/ri";
import ThemeSwitch from "./ThemeSwitch";
import { BackgroundImage } from '../assets';
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate()
  const { user, setCredentials } = useStore(state => state)

  useEffect(() => {
    user && navigate("/overview")
}, [user]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-violet-100 dark:bg-violet-900 transition-colors duration-300 bg-bottom md:bg-center bg-cover bg-blend-overlay`}
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Top Bar */}
      <div className="w-full flex justify-end p-4">
        <ThemeSwitch/>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col gap-2 items-center px-6 lg:px-12 text-center">
        <div className="flex items-center justify-center w-14 h-14 md:w-24 md:h-24 bg-violet-700 rounded-full">
          <RiCurrencyFill className="text-3xl md:text-5xl text-white hover:animate-spin" />
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-violet-900 dark:text-violet-100 mb-4">
          Welcome to Spendly
        </h1>
        <p className="text-lg lg:text-xl text-violet-700 dark:text-violet-300 mb-8">
          Track your expenses, manage your finances, and achieve your goals with
          ease.
        </p>
        <button className="px-6 py-3 bg-violet-500 text-white rounded-lg shadow-lg hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-800 transition-all duration-300">
          <Link to="/sign-up">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
