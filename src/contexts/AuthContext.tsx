import React, { createContext, useState, useCallback, useContext } from "react";
import { signIn as login } from "../services/User";
import { notification } from "../components/notifications";

interface AuthState {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
}

interface AuthContextData {
  user: AuthState | null;
  signIn(email: string, password: string): void;
  signOut(): void;
  updateData(user: any): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const Auth: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState | null>(() => {
    const user = localStorage.getItem("@sing4me:user");

    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  const signIn = useCallback((email: string, password: string) => {
    login(email, password)
      .then((res) => {
        const user = res.data;
        localStorage.setItem("@sing4me:user", JSON.stringify(user));
        setData(user);
      })
      .catch((err) => notification("Erro", err.response.data.error, "danger"));
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

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default Auth;
