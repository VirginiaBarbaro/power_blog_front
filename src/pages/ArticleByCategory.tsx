import { useState, useEffect } from "react";
import { Category } from "../types/category";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CustomLoader from "../components/utilities/CustomLoader";

function ArticleByCategory() {
  const [categories, setCategories] = useState<Category>();
  const { name } = useParams();

  useEffect(() => {
    const getArticlesByCategory = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/categories/${name}`,
      });
      console.log(response.data);
      setCategories(response.data);
    };
    getArticlesByCategory();
  }, [name]);

  function truncateText(text: string, limit: number) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return text;
    }
  }

  return categories && categories.articles ? (
    <>
      <NavigationBar />
      <h4 className="mt-28 text-3xl font-semibold text-center">
        {categories.name}
      </h4>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:p-4 lg:grid-cols-3 mx-auto pb-8 mt-10">
        {categories.articles.map((article) => {
          return (
            <div
              className="max-w-xs rounded-lg mx-auto article-box"
              key={article.id}
            >
              <img
                className="rounded-t-lg article-image"
                src={
                  typeof article.image === "object"
                    ? `${import.meta.env.VITE_APP_IMG_URL}${article.image[0]}`
                    : `${import.meta.env.VITE_APP_IMG_URL}${article.image}`
                }
                alt=""
              />
              <div className="p-4 mb-6">
                <Link to={`/article/${article.id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white article-title">
                    {article.title}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 article-content">
                  {truncateText(article.content, 10)}
                </p>
              </div>
              <Link to={`/article/${article.id}`}>
                <div className="article-arrow">
                  <span className="mx-2 read-more">Read more</span>
                  <i className="fa-solid fa-arrow-right mt-1 mr-2 arrow-icon"></i>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  ) : (
    <CustomLoader />
  );
}

export default ArticleByCategory;
