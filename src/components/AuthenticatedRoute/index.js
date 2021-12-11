import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const AuthenticatedRoute = (props) => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/loginRegister" />;
  }
  return <Route {...props} />;
};

export default AuthenticatedRoute;
