import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useSockets } from "../context/socket.context";

type Message = {
  status: boolean;
  message: string;
};

const styles = {
  wrapper: "min-h-screen h-screen w-[calc(100%_-_200px)] flex flex-col",
  messageList: "flex-1 overflow-y-scroll p-4",
  messageListUl: "list-none p-0 m-0",
  messageBox: "flex w-full bg-default p-4 border-t-2 border-solid border-black",
  messageBoxTextArea: "flex-1 p-4 text-xl rounded mr-2",
  messageBoxBtn: "ml-2 bg-violet-800 text-xl",
  message: "mb-4 p-4 rounded-lg border-black border-solid border-2 text-xl bg-default",
  messageInner: "flex flex-col mb-4",
  messageSender: "text-black text-xs",
  messageBody: "break-all",
  messageBtn: "whitespace-nowrap bg-violet-800 w-32 text-xl",
};

export default function Messages() {
  const { socket, username, room, roomMessages, setRoomMessages } = useSockets();
  const [message, setMessage] = useState("");
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages]);

  const handleMessage = () => {
    socket.emit(
      "message",
      {
        username,
        room_name: room,
        content: message,
      },
      (response: Message) => {
        alert(response.message);
      }
    );

    console.log(roomMessages);
    setMessage("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        <ul className={styles.messageListUl}>
          {roomMessages.map((message, index) => {
            return (
              <div className={styles.message} key={index}>
                <div className={styles.messageInner} key={index}>
                  <span className={styles.messageSender} key={index}>
                    {message.username} - [{dayjs(message.createdAt).format("DD/MM HH:mm")}]
                  </span>
                  <span className={styles.messageBody}>{message.content}</span>
                </div>
              </div>
            );
          })}
        </ul>
        <div ref={messageEndRef}></div>
      </div>
      <div className={styles.messageBox}>
        <textarea
          className={styles.messageBoxTextArea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1}
          placeholder="Digite sua mensagem..."
        />
        <button className={styles.messageBtn} onClick={handleMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}
