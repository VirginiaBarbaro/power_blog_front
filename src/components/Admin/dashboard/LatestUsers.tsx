import axios from "axios";
import { useEffect, useState } from "react";
import { UserProps } from "../../../types/user";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function LatestUsers() {
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    const getLatestUsers = async () => {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}/users`,
      });
      const notAdmin = response.data.filter((user: UserProps) => !user.isAdmin);

      const sortedUsers = notAdmin.sort((a: UserProps, b: UserProps) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      const lastFiveUsers = sortedUsers.slice(0, 5);

      setUsers(lastFiveUsers);
    };
    getLatestUsers();
  }, []);

  return users ? (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow sm:p-8 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest users
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {users.map((user) => {
            return (
              <li className="py-3 sm:py-4" key={user.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={`${
                        import.meta.env.VITE_APP_API_URL
                      }/${user.avatar.replace("public", "")}`}
                      alt={user.firstname + user.lastname}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/profile/${user.id}`}>
                      <p className="text-sm text-dark-black truncate hover:font-bold hover:cursor-pointer">
                        {user.firstname} {user.lastname}
                      </p>
                    </Link>
                    <p className="text-sm text-dark-grey truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-400">
                    {formatDistanceToNow(new Date(user.createdAt))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  ) : (
    <p className="text-center">Loadiung...</p>
  );
}

export default LatestUsers;
