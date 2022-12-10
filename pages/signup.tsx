import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useSockets } from "../context/socket.context";

type SignUp = {
  status: boolean;
  message: string;
};

const styles = {
  signupWrapper: "w-full flex min-h-screen items-center justify-center",
  signupInner: "flex flex-col bg-default p-16 rounded-lg",
  signupInputBtn: "m-2 p-2 text-xl rounded",
  signupBtn: "ml-4 whitespace-nowrap bg-violet-800",
  txt: "m-2 text-center",
  loginTxt: "text-violet-800 font-bold cursor-pointer",
};

export default function SignUp() {
  const router = useRouter();
  const { socket } = useSockets();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);

  const handleSignUp = () => {
    socket.emit(
      "sign_up",
      {
        username,
        password,
      },
      (response: SignUp) => {
        alert(response.message);
        console.log(response);
        if (response.status) {
          setSignUp(true);
          router.push("/");
        }
      }
    );
  };

  return (
    <>
      {!signUp && (
        <div className={styles.signupWrapper}>
          <div className={styles.signupInner}>
            <input
              className={styles.signupInputBtn}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário..."
              type="text"
            />
            <input
              className={styles.signupInputBtn}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha..."
              type="password"
            />
            <button className={styles.signupInputBtn + styles.signupBtn} onClick={handleSignUp}>
              Cadastrar
            </button>
            <p className={styles.txt}>
              Voltar para{" "}
              <Link href="/">
                <span className={styles.loginTxt}>Login</span>
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
