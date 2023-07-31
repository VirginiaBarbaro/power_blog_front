import { useEffect, useState } from "react";
import { Category } from "../../../types/category";
import axios from "axios";
import { Link } from "react-router-dom";

function TopCategories() {
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

  return categories ? (
    <div className="w-96 p-4 bg-white rounded-lg shadow sm:p-8 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Top categories
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {categories.map((category) => {
            return (
              <li className="py-3 sm:py-4" key={category.id}>
                <Link to={`/category/${category.name}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0 ">
                      <p className="text-md text-dark-black truncate hover:text-electric-blue hover:font-bold">
                        {category.name}
                      </p>
                    </div>
                    <div className="bg-blue-200 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 border border-blue-400">
                      {category.articles?.length}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  ) : (
    <p>Loading ...</p>
  );
}

export default TopCategories;
