import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as ConnectionProvider } from "@/context/connection";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConnectionProvider>
      <Component {...pageProps} />
    </ConnectionProvider>
  );
}
