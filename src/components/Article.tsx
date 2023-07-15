import axios from "axios";
import { useState, useEffect } from "react";
import { ArticleProps } from "../types/article";

function Article() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

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

  function truncateText(text: string, limit: number) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return text;
    }
  }

  return articles ? (
    <>
      <div className="container grid gap-8 sm:grid-cols-2 md:grid-cols-2 md:p-4 lg:grid-cols-3 mx-auto pb-8">
        {articles.map((article: ArticleProps) => (
          <div className="max-w-sm rounded-lg mx-auto article-box">
            <a href="#">
              <img
                className="rounded-t-lg article-image"
                src={`${
                  import.meta.env.VITE_APP_API_URL
                }/${article.image.replace("public\\", "")}`}
                alt=""
              />
            </a>
            <div className="p-4 mb-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white article-title">
                {article.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 article-content">
                {truncateText(article.content, 10)}
              </p>
            </div>
            <div className="article-arrow">
              <span className="mx-2 read-more">Read more</span>
              <i className="fa-solid fa-arrow-right mt-1 mr-2 arrow-icon"></i>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <p className="text-center">Loading...</p>
  );
}

export default Article;
