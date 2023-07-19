import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../redux/store";

function InfoUserLog() {
  const loggedUser = useSelector((state: RootState) => state.token);
  console.log(loggedUser);

  return (
    loggedUser && (
      <div>
        <p>{loggedUser.firstname}</p>
        <p>{loggedUser.lastname}</p>
        <button>edit Profile</button>
      </div>
    )
  );
}

export default InfoUserLog;
