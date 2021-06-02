import react from 'react'
import { io } from "socket.io-client";
import configData from '../config.json'

export const socket = io(configData.SERVER_URL);
export const SocketContext = react.createContext();


