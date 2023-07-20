import { useLocation } from "react-router-dom";
import InfoUserLog from "../components/InfoUserLog";
import InfoUserAuthor from "../components/InfoUserAuthor";
import NavigationBar from "../components/NavigationBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function UserProfile() {
  const loggedUser = useSelector((state: RootState) => state.token);
  const location = useLocation();

  const authorInfo = location.state;

  return (
    authorInfo &&
    loggedUser && (
      <>
        <NavigationBar />
        <div className="container mx-auto mt-28">
          {authorInfo.id === loggedUser.id ? (
            <InfoUserLog />
          ) : (
            <InfoUserAuthor authorInfo={authorInfo} />
          )}
        </div>
      </>
    )
  );
}

export default UserProfile;
