import react from 'react'
import { io } from "socket.io-client";

export const socket = io("https://guarded-falls-57008.herokuapp.com/");
export const SocketContext = react.createContext();


