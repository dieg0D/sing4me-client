import React, { createContext, useState, useCallback, useContext } from "react";
import { signIn as login } from "../services/User";
import { notification } from "../components/notifications";

const AuthContext = createContext();

const Auth = ({ children }) => {
  const [data, setData] = useState(() => {
    const user = localStorage.getItem("@sing4me:user");

    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  const signIn = useCallback((email, password, callBack = (p) => {}) => {
    callBack(true);
    login(email, password)
      .then((res) => {
        const user = res.data;
        localStorage.setItem("@sing4me:user", JSON.stringify(user));
        setData(user);
        callBack(false);
      })
      .catch((err) => {
        notification("Erro", err.response.data.message, "danger");
        callBack(false);
      });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@sing4me:user");
    setData(null);
  }, []);

  const updateData = useCallback(
    (user) => {
      localStorage.setItem(
        "@sing4me:user",
        JSON.stringify({ ...data, ...user })
      );
      setData({ ...data, ...user });
    },
    [data]
  );

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default Auth;
