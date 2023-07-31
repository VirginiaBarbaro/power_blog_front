import axios from "axios";
import { useEffect, useState } from "react";
import { Article, FavouriteArticle } from "../../types/article";
import { UserProps } from "../../types/user";

function CategoriesCard() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [favourites, setFavourites] = useState<FavouriteArticle[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/users`,
      });
      console.log(response.data);
      setUsers(response.data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles`,
      });
      console.log(response.data);
      setArticles(response.data);
    };
    getArticles();
  }, []);

  useEffect(() => {
    const getFavouritesArticles = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/favourites/all`,
      });
      console.log(response.data);
      setFavourites(response.data);
    };
    getFavouritesArticles();
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles`,
      });
      console.log(response.data);
      setArticles(response.data);
    };
    getArticles();
  }, []);

  return users && articles && favourites ? (
    <>
      <div className="border-3 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 max-[400px]:grid-cols-1 min-[401px]:grid-cols-2 p-4">
        {/* USERS  */}
        <div className="max-h-24 max-w-xs max-[400px]:my-3 mx-auto p-6 bg-white rounded-lg drop-shadow-lg hover:bg-light-grey  flex justify-between col-span-1 min-[401px]:mx-2">
          <div className="grid place-content-center mr-8">
            <i className="fa-solid fa-users text-4xl text-green-600 px-4 py-3 bg-green-200 rounded-md"></i>
          </div>
          <div>
            <p className="font-bold text-xl text-gray-700 dark:text-gray-400">
              {users.length}
            </p>
            <h5 className="mb-2 text-md font-medium  text-semidark-grey">
              Users
            </h5>
          </div>
        </div>
        {/* ARTICLES  */}

        <div className="max-h-24 max-w-xs max-[400px]:my-3 mx-auto p-6 bg-white rounded-lg drop-shadow-lg hover:bg-light-grey  flex justify-between col-span-1 min-[401px]:mx-2 ">
          <div className="grid place-content-center mr-8">
            <i className="fa-regular fa-newspaper text-4xl text-blue-600 px-4 py-3 bg-blue-200 rounded-md"></i>
          </div>
          <div>
            <p className="font-bold text-xl text-gray-700 dark:text-gray-400">
              {articles.length}
            </p>
            <h5 className="mb-2 text-md font-medium  text-semidark-grey">
              Articles
            </h5>
          </div>
        </div>

        {/* SAVED  */}

        <div className="max-w-xs max-h-24 max-[400px]:my-3 mx-auto p-6 bg-white rounded-lg drop-shadow-lg hover:bg-light-grey flex justify-between col-span-1 min-[401px]:my-2 w-full">
          <div className="grid place-content-center mr-8">
            <i className="fa-solid fa-bookmark text-4xl text-red-600 px-4 py-3 bg-red-200 rounded-md"></i>
          </div>
          <div>
            <p className="font-bold text-xl text-gray-700 dark:text-gray-400">
              {favourites.length}
            </p>
            <h5 className="mb-2 text-md font-medium  text-semidark-grey">
              Saved
            </h5>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading ...</p>
  );
}

/* <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Latest users
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Neil Sims
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $320
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Bonnie Green
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $3467
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-2.jpg"
                    alt="Michael image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Michael Gough
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $67
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-4.jpg"
                    alt="Lana image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Lana Byrd
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $367
                </div>
              </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-5.jpg"
                    alt="Thomas image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Thomes Lean
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $2367
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div> */

export default CategoriesCard;
