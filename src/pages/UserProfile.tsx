import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import InfoUserProfile from "../components/InfoUserProfile";
import ArticleUserProfile from "../components/ArticleUserProfile";

function UserProfile() {
  const { id } = useParams();

  const loggedUser = useSelector((state: RootState) => state.token);

  return loggedUser ? (
    <>
      <NavigationBar />
      <div className="container mx-auto mt-28">
        <div className="sm:grid sm:grid-cols-3 px-4">
          <div className="sm:col-span-1">
            <InfoUserProfile />
          </div>
          <div className="sm:col-span-2">
            {id && <ArticleUserProfile userId={id} />}
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default UserProfile;
