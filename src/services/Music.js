import api from "./api";

export const getMusic = (id) => {
  return api.get(`/music/${id}`, { responseType: "blob" });
};

export const searchMusic = (title) => {
  return api.get(`/music/search/${title}`);
};
