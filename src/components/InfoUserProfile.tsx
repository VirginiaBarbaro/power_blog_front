import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserProps } from "../types/user";
import CustomLoader from "./utilities/CustomLoader";
import useLoggedUser from "../hooks/useLoggedUser";
// import { Avatar } from "flowbite-react";

function InfoUserProfile() {
  const loggedUser = useLoggedUser();

  const [user, setUser] = useState<UserProps>();

  const { id } = useParams();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/users/${id}`,
      });
      setUser(response.data);
    };
    getUserInfo();
  }, [id]);

  return user ? (
    <div className="sticky top-28">
      <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg dark:bg-gray-800 dark:border-gray-700 info-user-box">
        <figcaption className="flex justify-center space-x-3">
          <img
            className="rounded-full w-16 h-16 "
            src={
              typeof user.avatar === "object"
                ? `${import.meta.env.VITE_APP_IMG_URL}${user.avatar[0]}`
                : `${import.meta.env.VITE_APP_IMG_URL}${user.avatar}`
            }
            alt="profile picture"
          />
          <div className="font-medium dark:text-white text-left">
            <div>
              {user.firstname} {user.lastname}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.username}
            </div>
            <p className="mt-4">{user.bio}</p>
          </div>
        </figcaption>
        {loggedUser.id === user.id ? (
          <>
            <div className="ms-auto w-auto">
              <Link to={`/settings/profile/${loggedUser.id}`}>
                <button className="mt-4 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-dark-grey to-semidark-grey group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none active:scale-90">
                  <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Edit Profile
                  </span>
                </button>
              </Link>
              <Link to={`/settings/data/${loggedUser.id}`} className="ml-4">
                <button className="mt-4 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-dark-grey to-semidark-grey group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none active:scale-90">
                  <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Data access
                  </span>
                </button>
              </Link>
            </div>
          </>
        ) : null}
      </figure>
    </div>
  ) : (
    <CustomLoader />
  );
}

export default InfoUserProfile;
