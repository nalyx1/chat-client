import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import SocketsProvider from "../context/socket.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketsProvider>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}
