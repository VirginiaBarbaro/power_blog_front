import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
    }
  };

  const categoryId = "implement-category!";

  const notify = () => {
    toast.warning("This feature is still under developement!", {
      autoClose: 3000,
      toastId: categoryId,
    });
  };

  return (
    <>
      <nav
        className={`bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600navbar-container ${
          isScrolling ? "navbar-dynamic" : "bg-navbar"
        } navbar navbar-expand-md bg-dark-blue`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/home"} className="flex items-center">
            <img
              src="/blog_logo.png"
              className="h-10 w-28 object-cover"
              alt="Power Blog Logo"
            />
          </Link>
          <div className="flex md:order-2">
            <button
              id="avatarButton"
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              type="button"
            >
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src="/landing.jpeg"
                alt="User dropdown"
              />
            </button>

            {/* <!-- Dropdown menu --> */}
            <div
              id="userDropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-dark-blue">
              <li>
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 navbar-link-effect p-5"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 navbar-link-effect"
                >
                  Post
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 navbar-link-effect"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 navbar-link-effect"
                  onClick={notify}
                >
                  Categories
                </Link>
                <ToastContainer />
              </li>
              <li>
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 navbar-link-effect"
                ></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
