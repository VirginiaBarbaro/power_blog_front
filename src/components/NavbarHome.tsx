import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import { Navbar } from "flowbite-react";

function NavbarHome() {
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

  return (
    <>
      <Navbar
        className={`dark:bg-gray-900 fixed w-full z-20 top-0 left-0 py-1  ${
          isScrolling ? "navbar-dynamic" : "bg-navbar"
        } navbar navbar-expand-md bg-dark-blue flex justify-between`}
      >
        <div className="container max-w-screen-xl flex flex-wrap p-1 justify-between">
          <Link to={"/home"} className="flex mt-2">
            <img
              src="/blog_logo.png"
              className="h-10 w-28 object-cover"
              alt="Power Blog Logo"
            />
          </Link>
          <div className="flex">
            <Navbar.Collapse>
              <div
                className="items-center justify-between w-full md:flex md:w-auto mt-1"
                id="navbar-sticky"
              >
                <ul className=" text-lg flex flex-col p-4 md:p-0 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-dark-blue">
                  <Link
                    to="#"
                    className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                  >
                    Home
                  </Link>
                  <Link
                    to="#"
                    className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                  >
                    About
                  </Link>
                  <Link
                    to="#"
                    className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                  >
                    Services
                  </Link>
                  <Link
                    to="#"
                    className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="#"
                    className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                  >
                    Contact
                  </Link>
                </ul>
              </div>
            </Navbar.Collapse>
          </div>
          <div className="flex justify-center">
            <div>
              <Navbar.Toggle />
            </div>
            <Dropdown
              // inline
              label={<Avatar alt="User settings" img="/landing.jpeg" rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </Navbar>

      {/* <nav
        className={`dark:bg-gray-900 fixed w-full z-20 top-0 left-0  ${
          isScrolling ? "navbar-dynamic" : "bg-navbar"
        } navbar navbar-expand-md bg-dark-blue`}
      >
        <div className="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4">
          <Link to={"/home"} className="flex items-center">
            <img
              src="/blog_logo.png"
              className="h-10 w-28 object-cover"
              alt="Power Blog Logo"
            />
          </Link>
          <div className="flex">
            <div
              className="items-center justify-between w-full md:flex md:w-auto"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-dark-blue md:static">
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
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center">
            <Dropdown
              inline
              label={<Avatar alt="User settings" img="/landing.jpeg" rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </nav> */}
    </>
  );
}

export default NavbarHome;
