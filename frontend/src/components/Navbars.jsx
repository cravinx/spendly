import React, { useState, useEffect } from "react";
import { RiCurrencyLine } from "react-icons/ri";
import { Avatar } from "../assets";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ThemeSwitch from "./ThemeSwitch";
import useStore from "../store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../libs/firebaseConfig";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

export const links = [
  { label: "Dashboard", link: "/overview" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/account" },
  { label: "Settings", link: "/settings" },
];

const Navbar = () => {
  const [selected, setSelected] = useState(0);
  const { user, setCredentials } = useStore((state) => state);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const [showMenu, setShowMenu] = useState(true);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignout = async () => {
    if (user.provider === "google") {
      await handleSocialLogout();
    }
    localStorage.removeItem("user");
    setCredentials(null);
    navigate("/sign-in");
  };

  const handleSocialLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <nav
      className={`{w-full flex items-center py-5 sticky top-0 z-20 md:px-20 px-6 ${
        scrolled ? "bg-white dark:bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-lg border-b border-gray-200 dark:border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-violet-700 rounded-xl">
            <RiCurrencyLine className="text-white text-3xl hover:animate-spin" />
          </div>
          <span className="text-xl font-bold text-black dark:text-white">
            My-Finance
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {links.map((link, index) => (
            <div
              key={index}
              className={`${
                index === selected
                  ? "bg-black dark:bg-slate-800 text-white"
                  : "text-gray-700 dark:text-gray-500"
              } px-6 py-2 rounded-full`}
            >
              <Link onClick={() => setSelected(index)} to={link.link} key={index}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-10 2xl:gap-20">
          <ThemeSwitch />

          <div className="items-center gap-2 group relative hidden md:flex cursor-pointer">
            <div className="hidden md:block">
              {/* <p className='text-lg font-medium text-black dark:text-gray-400'>
              {user?.firstname.charAt(0)}
            </p>
            <span className='text-sm text-gray-700 dark:text-gray-500'>
              johndoe@gmail.com
            </span> */}
              <p className="text-lg text-white font-bold rounded-full bg-purple-600 flex items-center justify-center h-12 w-12">
                {user?.firstname.charAt(0).toUpperCase()}
              </p>
            </div>
            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180 cursor-pointer dark:text-white" />
            <div className="absolute -left-9 top-[3.1em] z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block shadow-md ">
              <ul className="space-y-3 text-center">
                <li className="flex items-center gap-1 hover:bg-[#0287a8]/20 w-full rounded-md px-1 py-2">
                  <p className="text-sm text-white font-bold rounded-full bg-purple-600 flex items-center justify-center h-5 w-5">
                    {user?.firstname.charAt(0).toUpperCase()}
                  </p>
                  <p className="flex text-sm ">
                    {user?.firstname + " "}
                    {user?.lastname}
                  </p>
                </li>
                <li>
                  <Link
                    className="inline-block w-full rounded-md p-2 hover:bg-[#0287a8]/20"
                    to="/settings"
                    onClick={() => setSelected(3)}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    className="inline-block w-full rounded-md p-2 hover:bg-[#0287a8]/20"
                    onClick={handleSignout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:hidden block dark:text-white">
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
