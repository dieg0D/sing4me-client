import api from "./api";

export const getRooms = () => {
  return api.get("/rooms");
};

export const createRooms = (name, password) => {
  return api.post("/rooms", { name, password });
};

export const enterRoom = (id, password) => {
  return api.post("/rooms/enter", { id, password });
};
