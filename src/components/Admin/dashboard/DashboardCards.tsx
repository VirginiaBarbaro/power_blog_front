import axios from "axios";
import { useEffect, useState } from "react";
import { Article, FavouriteArticle } from "../../../types/article";
import { UserProps } from "../../../types/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function DashboardCards() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [favourites, setFavourites] = useState<FavouriteArticle[]>([]);

  const loggedUser = useSelector((state: RootState) => state.token);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/users`,
      });
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
      setArticles(response.data);
    };
    getArticles();
  }, []);

  useEffect(() => {
    const getFavouritesArticles = async () => {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/favourites/all`,
      });
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
      setArticles(response.data);
    };
    getArticles();
  }, []);

  return users && articles && favourites ? (
    <>
      <div className="grid grid-cols-3 sm:grid-cols sm: gap-4 md:grid-cols-3 max-[400px]:grid-cols-1 min-[401px]:grid-cols-2 p-4">
        {/* USERS  */}
        <div className="max-w-xs card-dashboard max-h-24 mx-auto p-6 bg-white rounded-lg drop-shadow-lg hover:bg-light-grey  flex justify-between col-span-1">
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

        <div className="max-w-xs card-dashboard max-h-24 mx-auto p-6 bg-white rounded-lg drop-shadow-lg hover:bg-light-grey  flex justify-between col-span-1 ">
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

        <div className="card-dashboard max-h-24 mx-auto p-6 bg-white rounded-lg drop-shadow-lg hover:bg-light-grey flex justify-between col-span-1">
          <div className="grid place-content-center mr-8">
            <i className="fa-solid fa-heart text-4xl text-red-600 px-4 py-3 bg-red-200 rounded-md"></i>
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

export default DashboardCards;
