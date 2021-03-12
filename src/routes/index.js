import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Home from "../pages/Home";

import Room from "../pages/Room";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecoverPassword from "../pages/RecoverPassword";
import UpdatePassword from "../pages/UpdatePassword";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} isPrivate />
      <Route path="/room/:roomID" component={Room} isPrivate />
      <Route path="/update-password" component={UpdatePassword} isPrivate />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/recover-password" component={RecoverPassword} />
    </Switch>
  );
};

export default Routes;
