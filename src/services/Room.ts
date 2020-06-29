import api from "./api";

export const getRooms = () => {
  return api.get("/rooms");
};

export const createRooms = (name: string, password: string) => {
  return api.post("/rooms", { name, password });
};

export const enterRoom = (id: string, password: string) => {
  return api.post(`/rooms/${id}`, { password });
};
