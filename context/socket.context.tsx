import { createContext, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";

type Context = {
  socket: Socket;
  logged: boolean;
  setLogged: Function;
  username: string;
  setUsername: Function;
  room: string;
  setRoom: Function;
  rooms: [{ id: string; name: string; private: boolean }];
  setRooms: Function;
  roomMessages: [{ username: string; room_name: string; content: string; createdAt: Date }];
  setRoomMessages: Function;
};

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  logged: false,
  setLogged: () => false,
  username: "",
  setUsername: () => false,
  room: "",
  setRoom: () => false,
  rooms: [{ id: "", name: "", private: false }],
  setRooms: () => false,
  roomMessages: [{ username: "", room_name: "", content: "", createdAt: new Date() }],
  setRoomMessages: () => false,
});

export default function SocketsProvider(props: any) {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([{}]);
  const [roomMessages, setRoomMessages] = useState([]);

  socket.on("message", (data) => {
    setRoomMessages(data);
  });

  socket.on("rooms", (data) => {
    setRooms(data);
  });

  socket.on("joined_room", (data) => {
    setRoom(data);
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        room,
        setRoom,
        rooms,
        setRooms,
        roomMessages,
        setRoomMessages,
        logged,
        setLogged,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);
