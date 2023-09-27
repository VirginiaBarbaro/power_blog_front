import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import InfoUserProfile from "../components/InfoUserProfile";
import ArticleUserProfile from "../components/ArticleUserProfile";
import Footer from "../components/Footer";
import CustomLoader from "../components/utilities/CustomLoader";
import useLoggedUser from "../hooks/useLoggedUser";

function UserProfile() {
  const { id } = useParams();

  const loggedUser = useLoggedUser();

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
      <Footer />
    </>
  ) : (
    <CustomLoader />
  );
}

export default UserProfile;
