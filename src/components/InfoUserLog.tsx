import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store";

function InfoUserLog() {
  const loggedUser = useSelector((state: RootState) => state.token);

  return (
    loggedUser && (
      <div className="border ">
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
          <figcaption className="flex justify-center space-x-3">
            <img
              className="rounded-full w-16 h-16"
              src={`${import.meta.env.VITE_APP_API_URL}/${loggedUser.avatar}`}
              alt="profile picture"
            />
            <div className="font-medium dark:text-white text-left">
              <div>
                {loggedUser.firstname} {loggedUser.lastname}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {loggedUser.username}
              </div>
              <p className="mt-4">{loggedUser.bio}</p>

              <button className="mt-4 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-dark-grey to-semidark-grey group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:outline-none active:scale-90">
                <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Edit Profile
                </span>
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    )
  );
}

export default InfoUserLog;
