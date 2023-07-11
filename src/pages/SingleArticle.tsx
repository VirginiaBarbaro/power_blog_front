import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArticleProps } from "../types/article";
import Navbar from "../components/Navbar";

function SingleArticle() {
  const { id } = useParams();

  const [article, setArticle] = useState<ArticleProps>();

  useEffect(() => {
    const getArticleInfo = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/articles/${id}`,
      });
      console.log(response.data);
      setArticle(response.data);
    };
    getArticleInfo();
  }, [id]);

  return article ? <Navbar /> : <p className="text-center">Loading...</p>;
}

export default SingleArticle;
