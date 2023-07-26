import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { Article } from "../types/article";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function FavouriteArticle() {
  const loggedUser = useSelector((state: RootState) => state.token);

  const [favouritesArticles, setFavouritesArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getFavouritesArticles = async () => {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/favourites`,
      });
      console.log(response.data);
      setFavouritesArticles(response.data);
    };
    getFavouritesArticles();
  }, []);

  function truncateText(text: string, limit: number) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return text;
    }
  }

  return favouritesArticles ? (
    <>
      <NavigationBar />
      <div className="container mx-auto mt-28">
        <h2 className="text-3xl text-center mb-8">
          Your favourite article all in one place
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 md:p-4 lg:grid-cols-3 mx-auto gap-8">
          {favouritesArticles.map((favourite: Article) => {
            return (
              <div
                className="max-w-xs rounded-lg mx-auto article-box"
                key={favourite.id}
              >
                <img
                  className="rounded-t-lg article-image"
                  src={`${
                    import.meta.env.VITE_APP_API_URL
                  }/${favourite.article.image.replace("public", "")}`}
                  alt=""
                />
                <div className="p-4 mb-5">
                  <Link to={`/article/${favourite.article.id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white  article-title">
                      {favourite.article.title}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 article-content">
                    {truncateText(favourite.article.content, 10)}
                  </p>
                </div>
                <Link to={`/article/${favourite.article.id}`}>
                  <div className="article-arrow">
                    <span className="mx-2 read-more">Read more</span>
                    <i className="fa-solid fa-arrow-right mt-1 mr-2 arrow-icon"></i>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {favouritesArticles.length === 0 && (
          <div className="no-favourite-article rounded mx-auto">
            <h2 className="no-favourite-article-title text-center">
              You haven't saved any favorite articles yet!
            </h2>
            <h2 className="no-favourite-article-message text-center">
              Start saving your favorite articles now!
            </h2>
          </div>
        )}
      </div>
      <Footer />
    </>
  ) : (
    <p className="text-center">Loading...</p>
  );
}

export default FavouriteArticle;
