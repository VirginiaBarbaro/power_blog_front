import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setToken } from "../../redux/slices/tokenSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const loggedUser = useSelector((state: RootState) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setToken({ token: null, user: null }));
    navigate("/home");
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-md bg-white py-3 fixed z-20 top-0 left-0 right-0">
      <button
        className="ml-14 bg-electric-blue text-light-grey p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div
        className={`${
          !open && "hidden"
        } bg-semidark-grey/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`${
          open ? "w-80" : "w-0"
        } bg-electric-blue min-h-screen fixed top-0 left-0 transition-all duration-300`}
      >
        <div className={`${!open && "hidden"}`}>
          <button
            className="ml-4 text-white pt-3"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="space-x-4 py-2">
            <div className="flex justify-center mb-2">
              <img
                className="w-24 h-24 rounded-full ml-2"
                src={
                  loggedUser.token
                    ? `${import.meta.env.VITE_APP_IMG_URL}${loggedUser.avatar}`
                    : `${import.meta.env.VITE_APP_IMG_URL}/no_login.png`
                }
                alt=""
              />
            </div>
            <div className="text-center text-light-grey px-4 text-lg">
              <p>
                {loggedUser.firstname} {loggedUser.lastname}
              </p>
              <p className=" text-white">{loggedUser.email}</p>
            </div>
          </div>
          <Link to={"/admin/dashboard"}>
            <div className="ml-2 text-white text-xl hover:bg-light-grey hover:rounded-l-md hover:text-electric-blue cursor-pointer py-3 px-3 mb-2">
              <i className="fa-solid fa-chart-line mr-2"></i> Dashboard
            </div>
          </Link>
          <Link to={"/admin/users"}>
            <div className="ml-2 text-white text-xl hover:bg-light-grey hover:rounded-l-md hover:text-electric-blue cursor-pointer py-3 px-3 mb-2">
              <i className="fa-solid fa-users mr-2"></i>All users
            </div>
          </Link>
          <Link to={"/admin/articles"}>
            <div className="ml-2 text-white text-xl hover:bg-light-grey  hover:rounded-l-md hover:text-electric-blue cursor-pointer py-3 px-3 mb-2">
              <i className="fa-regular  fa-newspaper mr-2"></i> Articles
            </div>
          </Link>
          <Link to={"/admin/categories"}>
            <div className="ml-2 text-white text-xl hover:bg-light-grey hover:rounded-l-md hover:text-electric-blue cursor-pointer py-3 px-3 mb-2">
              <i className="fa-solid fa-list-ul mr-2"></i> Categories
            </div>
          </Link>
          <Link to={"/home"}>
            <div className="ml-2 text-white text-xl hover:bg-light-grey hover:rounded-l-md hover:text-electric-blue cursor-pointer py-3 px-3 mb-2">
              <i className="fa-solid fa-blog mr-2"></i> Blog
            </div>
          </Link>
          <div
            className="ml-2 text-white text-xl hover:bg-light-grey hover:rounded-l-md hover:text-electric-blue cursor-pointer py-3 px-3 mb-2"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-power-off mr-2"></i> Sign out
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
