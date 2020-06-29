import api from "./api";

export const signIn = (email: string, password: string) => {
  return api.post("/auth", { email, password });
};

export const signUp = (name: string, email: string, password: string) => {
  return api.post("/users", { name, email, password });
};

export const updateName = (name: string) => {
  return api.put("/users/name", { name });
};

export const updateAvatar = (avatar: string) => {
  return api.put("/users/avatar", { avatar });
};

export const updatePassword = (oldPassword: string, newPassword: string) => {
  return api.put("/users/password", { oldPassword, newPassword });
};
