import { useEffect, useState } from "react";
import axios from "axios";
import { ArticleProps } from "../types/article";
// import { Link } from "react-router-dom";

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

  return (
    articles && (
      <>
        <div className="flex min-h-screen items-center bg-neutral-800 mt-28">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mx-auto pb-8">
            {articles.map((article: ArticleProps) => (
              <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl   hover:shadow-black/30 rounded-lg">
                <div className="h-96 w-72">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-125"
                    src={`${
                      import.meta.env.VITE_APP_API_URL
                    }/${article.image.replace("public\\", "")}`}
                    alt=""
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                  <h1 className="font-dmserif text-3xl font-bold text-white">
                    <i className="fa-solid fa-angles-up text-dark-beige"></i>
                  </h1>
                  <p className="mb-3 text-2xl font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {article.title}
                  </p>
                  <p className="mb-3 text-base text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {truncateText(article.content, 10)}
                  </p>
                  <button
                    type="button"
                    className="text-white bg-dark-beige hover:bg-gradient-to-br shadow-lg  dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 read-btn ease-in-out duration-300 hover:bg-light-blue"
                  >
                    Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
}

export default Article;
