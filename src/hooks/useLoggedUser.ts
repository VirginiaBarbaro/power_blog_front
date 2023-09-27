import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function useLoggedUser() {
  return useSelector((state: RootState) => state.token);
}

export default useLoggedUser;
