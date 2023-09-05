import { useState, useEffect } from "react";
import axios from "axios";
import { ArticleProps } from "../types/article";

export default function useArticles() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

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

  return articles;
}
