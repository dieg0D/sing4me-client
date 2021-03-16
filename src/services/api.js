import axios from "axios";

// export const url = "http://localhost:3000/";
export const url = "https://sing4me-api.herokuapp.com/";

const api = axios.create({
  baseURL: url + "v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const user = localStorage.getItem("@sing4me:user");
      if (user) {
        config.headers.Authorization = `Bearer ${JSON.parse(user)?.token}`;
      }
      return config;
    } catch (e) {
      console.log(e);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
