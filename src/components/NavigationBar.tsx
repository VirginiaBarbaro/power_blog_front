import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import { Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setToken } from "../redux/slices/tokenSlice";

function NavigationBar() {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const loggedUser = useSelector((state: RootState) => state.token);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setToken({ token: null, user: null }));
  };

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
    loggedUser && (
      <>
        <Navbar
          className={`dark:bg-gray-900 fixed w-full z-20 top-0 left-0 py-1  ${
            isScrolling ? "navbar-dynamic" : "bg-navbar"
          } navbar navbar-expand-md bg-dark-blue flex justify-between`}
        >
          <div className="container max-w-screen-xl flex flex-wrap p-1 justify-between">
            <Link to={"/home"} className="flex mt-3">
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
                  <ul className="text-lg flex flex-col p-4 md:p-0 font-semibold rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-dark-blue">
                    <Link
                      to="/home"
                      className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                    >
                      Home
                    </Link>
                    <Link
                      to="#"
                      className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                    >
                      Categories
                    </Link>
                    <Link
                      to="#"
                      className="element-navbar block md:bg-transparent py-2 pl-3 pr-4 md:p-0"
                    >
                      Post
                    </Link>
                  </ul>
                </div>
              </Navbar.Collapse>
            </div>
            <div className="flex justify-center">
              <div className="mt-3">
                <Navbar.Toggle />
              </div>
              <Dropdown
                // inline
                label={
                  <Avatar
                    alt="User avatar"
                    img={
                      loggedUser.token
                        ? `${
                            import.meta.env.VITE_APP_API_URL
                          }${loggedUser.avatar.replace("public", "")}`
                        : "/no_login.png"
                    }
                    rounded
                  />
                }
              >
                {loggedUser.token ? (
                  <>
                    <Dropdown.Header>
                      <span className="block text-sm">
                        {loggedUser.username}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {loggedUser.email}
                      </span>
                    </Dropdown.Header>
                    <Link to={`/profile/${loggedUser.id}`}>
                      <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Link to={"/favourite/article"}>
                      <Dropdown.Item>Saved</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Sign out
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>
                      <Dropdown.Item>Login</Dropdown.Item>
                    </Link>
                    <Link to={"/signup"}>
                      <Dropdown.Item>Sign up</Dropdown.Item>
                    </Link>
                  </>
                )}
              </Dropdown>
            </div>
          </div>
        </Navbar>
      </>
    )
  );
}

export default NavigationBar;
