import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// eslint-disable-next-line react-hooks/rules-of-hooks
function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
