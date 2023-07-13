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
        className={`bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0  ${
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
              // data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              type="button"
            >
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src="/landing.jpeg"
                alt="User dropdown"
              />
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-dark-blue">
              <li className="element-navbar">
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 p-5"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="element-navbar">
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 navbar-link-effect"
                >
                  Post
                </Link>
              </li>
              <li className="element-navbar">
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 navbar-link-effect"
                >
                  Write
                </Link>
              </li>
              <li className="element-navbar">
                <Link
                  to="#"
                  className="block md:bg-transparent py-2 pl-3 pr-4 md:p-0 navbar-link-effect"
                  onClick={notify}
                >
                  Categories
                </Link>
                <ToastContainer />
              </li>
              <li className="element-navbar">
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
