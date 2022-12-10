import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSockets } from "../context/socket.context";
import type { Response } from "../@types";

const styles = {
  loginWrapper: "w-full flex min-h-screen items-center justify-center",
  loginInner: "flex flex-col bg-default p-16 rounded-lg",
  loginInputBtn: "m-2 p-2 text-xl rounded",
  loginBtn: "ml-4 whitespace-nowrap bg-violet-800",
  txt: "m-2",
  signupTxt: "text-violet-800 font-bold cursor-pointer",
};

export default function Login() {
  const router = useRouter();
  const { socket, username, setUsername, logged, setLogged } = useSockets();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    socket.emit(
      "login",
      {
        username,
        password,
      },
      (response: Response) => {
        alert(response.message);
        if (response.status) {
          localStorage.setItem("username", username);
          setLogged(true);
          router.push("/chat");
        }
      }
    );
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginInner}>
        <input
          className={styles.loginInputBtn}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário..."
          type="text"
        />
        <input
          className={styles.loginInputBtn}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha..."
          type="password"
        />
        <button className={styles.loginInputBtn + styles.loginBtn} onClick={handleLogin}>
          Login
        </button>
        <p className={styles.txt}>
          Não tem uma conta?{" "}
          <Link href="/signup">
            <span className={styles.signupTxt}>Registre-se</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
