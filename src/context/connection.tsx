import useSocket, { Socket } from "react-io-client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export const Connection = createContext<{
  socket?: Socket | null;
  setRooms?: Dispatch<SetStateAction<any[]>>;
  setConnected?: Dispatch<React.SetStateAction<boolean>>;
  setIsLoading?: Dispatch<React.SetStateAction<boolean>>;
  setCurRoom?: Dispatch<React.SetStateAction<{}>>;

  rooms?: any[];
  isLoading?: boolean;
  connected?: boolean;
  curRoom?: any;
}>({ socket: undefined });

export function Provider({ children }: { children: React.ReactNode }) {
  const [socket] = useSocket(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER || "", {
    query: {},
    autoConnect: false, // auto connect disabled here
    reconnection: false,
  });
  const [connected, setConnected] = useState(socket.connected);
  const [curRoom, setCurRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  return (
    <Connection.Provider
      value={{
        socket,
        isLoading,
        connected,
        setIsLoading,
        setConnected,
        setCurRoom,
        curRoom,
        rooms,
        setRooms,
      }}
    >
      {children}
    </Connection.Provider>
  );
}

export default Provider;
