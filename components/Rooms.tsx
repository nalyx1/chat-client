import { useEffect, useRef, useState } from "react";
import { useSockets } from "../context/socket.context";
import type { Response } from "../@types";

const styles = {
  container: "w-72 bg-default min-h-screen h-screen p-4 border-solid border-black border-r-2",
  createRoomWrapper: "pb-2 border-b border-solid border-gray-500",
  createRoomInput: "mb-2 p-2 text-xl rounded w-full",
  createRoomBtn: "text-xl whitespace-nowrap bg-violet-800 w-full",
  roomList: "list-none p-0 flex-1 overflow-y-scroll p-4 h-default",
  roomListBtn: "w-full mt-2 bg-violet-900 flex disabled:bg-gray-500 disabled:cursor-default",
  roomListBtnSpan: "flex-1 text-left",
};

export default function Rooms() {
  const { socket, room, setRoom, rooms, setRooms, setRoomMessages } = useSockets();
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [rooms]);

  const handleRoom = () => {
    socket.emit(
      "room",
      {
        name: room,
        privateRoom: false,
      },
      (response: Response) => {
        alert(response.message);
      }
    );

    setRoom("");
  };

  const handleJoinRoom = (roomName: string) => {
    socket.emit("join_room", {
      name: roomName,
    });
  };

  return (
    <nav className={styles.container}>
      <div className={styles.createRoomWrapper}>
        <input
          className={styles.createRoomInput}
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Nome da sala..."
        />
        <button className={styles.createRoomBtn} onClick={handleRoom}>
          Criar
        </button>
      </div>

      <ul className={styles.roomList}>
        {rooms.map((item, index) => {
          return (
            <div key={index}>
              <button
                disabled={item.name == room}
                className={styles.roomListBtn}
                key={index}
                onClick={() => handleJoinRoom(item.name)}
              >
                <span className={styles.roomListBtnSpan}>{item.name}</span>
              </button>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </ul>
    </nav>
  );
}
