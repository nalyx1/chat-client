import Rooms from "../components/Rooms";
import Messages from "../components/Messages";
import { useEffect } from "react";
import { useSockets } from "../context/socket.context";
import { useRouter } from "next/router";

export default function Chat() {
  const { logged } = useSockets();
  const router = useRouter();

  useEffect(() => {
    document.title = "Chat";
    if (!logged) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Rooms />
      <Messages />
    </div>
  );
}
