import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../types/category";

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/categories`,
      });
      setCategories(response.data);
    };
    getCategories();
  }, []);

  return categories;
}

export default useCategories;
