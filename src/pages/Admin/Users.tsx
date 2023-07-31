import { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import axios from "axios";
import { UserProps } from "../../types/user";

function Users() {
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/users`,
      });

      const usersArticles = await Promise.all(
        response.data.map(async (user: UserProps) => {
          const articleResponse = await axios({
            method: "get",
            url: `${import.meta.env.VITE_APP_API_URL}/articles/user/${user.id}`,
          });
          return { ...user, articlesCount: articleResponse.data.length };
        })
      );

      console.log(usersArticles);
      setUsers(usersArticles);
    };
    getUsers();
  }, []);

  return users ? (
    <>
      <Sidebar />
      <div className="container mt-24 mx-auto mb-8">
        <h2 className="my-10 text-center text-2xl">Users managment</h2>
        <div className="flex align-top justify-between max-[639px]:flex-col">
          <table className="text-sm text-left text-gray-500 w-full max-w-3xl max-[639px]:max-w-lg shadow-md">
            <thead className="text-xs text-gray-700 uppercase bg-light-grey">
              <tr>
                <th scope="col" className="p-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Fullname
                </th>
                <th className="ml-14 py-3">Articles posted</th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <p>{user.id}</p>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`${
                          import.meta.env.VITE_APP_API_URL
                        }/${user.avatar.replace("public", "")}`}
                        alt={user.firstname + user.lastname}
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {user.firstname} {user.lastname}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </th>
                    <td className="text-center">
                      <p className="text-dark-black text-md">
                        {user.articlesCount}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit user
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mx-auto">
            <button
              type="button"
              className="text-electric-blue hover:text-white border border-electric-blue hover:bg-electric-blue focus:outline-none focus:ring-electric-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-300 ease"
            >
              Create user
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className="text-center">Loading ...</p>
  );
}

export default Users;
