import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store";
import { useState, useEffect } from "react";
import axios from "axios";
import { ArticleProps } from "../types/article";

function InfoUserLog() {
  const loggedUser = useSelector((state: RootState) => state.token);
  const [userArticles, setUserArticles] = useState([]);

  useEffect(() => {
    const getUserArticles = async () => {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles/logged/${
          loggedUser.token
        }`,
      });
      console.log(response.data);
      setUserArticles(response.data);
    };
    getUserArticles();
  }, [loggedUser.token]);

  function truncateText(text: string, limit: number) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return text;
    }
  }

  return (
    loggedUser &&
    userArticles && (
      <div className="sm:grid sm:grid-cols-3 px-4">
        <div className="sm:col-span-1">
          <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg dark:bg-gray-800 dark:border-gray-700 sticky top-16">
            <figcaption className="flex justify-center space-x-3">
              <img
                className="rounded-full w-16 h-16 "
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
        <div className="sm:col-span-2">
          {userArticles.map((article: ArticleProps) => {
            return (
              <div
                className="max-w-md mx-auto rounded-xl overflow-hidden md:max-w-2xl mb-8 card-user-article"
                key={article.id}
              >
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img
                      className="h-48 w-full object-cover md:h-full md:w-48"
                      src={`${import.meta.env.VITE_APP_API_URL}/${
                        article.image
                      }`}
                      alt="Modern building architecture"
                    />
                  </div>
                  <div className="px-4 pb-4 pt-2">
                    <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {article.title}
                    </div>

                    <p className="mt-2 text-dark-grey-300">
                      {truncateText(article.content, 10)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default InfoUserLog;
