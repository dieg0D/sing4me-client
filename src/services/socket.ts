import socketIO from "socket.io-client";
import { url } from "./api";

export const socket = socketIO(url);
