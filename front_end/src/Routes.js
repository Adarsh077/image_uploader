import { Route, Switch, Redirect } from "react-router-dom";

import { Login, Register, Dashboard, UploadImage } from "./pages";
import MainLayout from "./layouts/MainLayout";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Redirect path="/" to="/login" />
    </Switch>
  );
};

const ProtectedRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/upload" component={UploadImage} />
        <Redirect path="/" to="/dashboard" />
      </Switch>
    </MainLayout>
  );
};

const Routes = () => {
  const { isAuthenticated } = useContext(GlobalContext);

  return isAuthenticated ? <ProtectedRoutes /> : <AuthRoutes />;
};

export default Routes;
