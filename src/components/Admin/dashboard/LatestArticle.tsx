import { useState, useEffect } from "react";
import { ArticleProps } from "../../../types/article";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

function LatestArticle() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles`,
      });
      const sortedArticles = response.data.sort(
        (a: ArticleProps, b: ArticleProps) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        }
      );
      const lastFiveArticles = sortedArticles.slice(0, 5);
      console.log(lastFiveArticles);
      setArticles(lastFiveArticles);
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

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Recent articles
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {articles.map((article: ArticleProps) => {
            return (
              <li className="py-3 sm:py-4" key={article.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-16 h-12 rounded-md"
                      src={`${
                        import.meta.env.VITE_APP_API_URL
                      }/${article.image.replace("public", "")}`}
                      alt={article.headline}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-md  text-gray-900 truncate dark:text-white">
                      {truncateText(article.title, 3)}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {article.user.firstname} {article.user.lastname}
                    </p>
                    <p className="text-sm text-dark-grey truncate font-semibold">
                      Published{" "}
                      {formatDistanceToNow(new Date(article.createdAt))}
                    </p>
                  </div>

                  <p className=" bg-blue-100 text-electric-blue font-semibold text-xs mr-2 px-2.5 py-0.5 rounded border border-electric-blue">
                    {article.category.name}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LatestArticle;
