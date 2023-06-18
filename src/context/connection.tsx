import useSocket, { Socket } from "react-io-client";
import { createContext, useEffect } from "react";

export const Connection = createContext<{
  socket: Socket | null ;
}>({ socket: null });

export function Provider({ children }: { children: React.ReactNode }) {
  const [socket] = useSocket("ws://localhost:4689", {
    query: {},
    autoConnect: false,
    reconnection: false,
  });

  useEffect(() => {
    !socket.connected && socket.connect();
    if (!socket) return;
    socket.on("connect", () => {
      console.log("socket connected", socket);
      socket.on("disconnect", () => {
        console.log("socket disconnected");
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Connection.Provider
      value={{
        socket,
      }}
    >
      {children}
    </Connection.Provider>
  );
}

export default Provider;
