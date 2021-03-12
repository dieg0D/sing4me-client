import api from "./api";

export const signIn = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const signUp = (name, email, password) => {
  return api.post("/users", { name, email, password });
};

export const updateName = (name) => {
  const user = localStorage.getItem("@sing4me:user");
  return api.put(`/users/${JSON.parse(user)?.id}`, { name });
};

export const updateAvatar = (avatar) => {
  const user = localStorage.getItem("@sing4me:user");
  return api.put(`/users/${JSON.parse(user)?.id}`, { avatar });
};

export const updatePassword = (oldPassword, newPassword) => {
  const user = localStorage.getItem("@sing4me:user");
  return api.put(`/users/${JSON.parse(user)?.id}`, {
    oldPassword,
    newPassword,
  });
};
