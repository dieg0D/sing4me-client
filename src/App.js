import "react-notifications-component/dist/theme.css";
import React from "react";
import ReactNotification from "react-notifications-component";

import { BrowserRouter } from "react-router-dom";

import AuthContext from "./contexts/AuthContext";
import Routes from "./routes";
import GlobalStyles from "./styles/global";

const App = () => {
  return (
    <AuthContext>
      <ReactNotification />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyles />
    </AuthContext>
  );
};

export default App;
