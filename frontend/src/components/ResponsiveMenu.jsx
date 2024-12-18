import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "./Navbar";
import useStore from "../store";

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const { user, setCredentials } = useStore((state) => state);
  return (
    <div
      className={`${
        showMenu ? "right-0" : "-right-[100%]"
      } fixed bottom-0 top-20 z-20 flex h-screen w-[60%] md:w-[40%] flex-col justify-between bg-white dark:bg-slate-800 dark:text-white px-5 md:px-2 pb-6 pt-5 text-black transition-all duration-200 md:hidden rounded-l-xl shadow-md`}
    >
      <div className="card">
        <div className="flex flex-col items-start justify-center gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Hello {" " + user?.firstname}</h1>
            <h1 className="text-sm text-slate-500">{user?.email}</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {links.map((data, index) => (
              <li key={index}>
                <Link
                  to={data.link}
                  key={index}
                  onClick={() => setShowMenu(false)}
                  className="mb-5 inline-block"
                >
                  {data.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
