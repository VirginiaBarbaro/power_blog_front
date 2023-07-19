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
        <div className="mt-28 container mx-auto sm:grid sm:grid-cols-3">
          <div className="border sm:col-span-2">columna 1</div>
          <div className="columna1 border sm:col-span-1">
            {authorInfo.id === loggedUser.id ? (
              <InfoUserLog />
            ) : (
              <InfoUserAuthor authorInfo={authorInfo} />
            )}
          </div>
        </div>
      </>
    )
  );
}

export default UserProfile;
