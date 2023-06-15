import { useContext, useState } from "react";
import { GameRoom } from "types";
import { Connection } from "@/context/connection";
import { NextRouter } from "next/router";

export const useGameSocket = ({
  router,
}: { router?: NextRouter } | undefined) => {
  const { socket } = useContext(Connection);
  const [rooms, setRooms] = useState([]);
  const [curRoom, setCuRoom] = useState({});
  const [curMsg, setCurMsg] = useState("");
  const [messages, setMessages] = useState([]);

  if (!socket) return;

  socket.on("gotoRoom", (e) => {
    setCuRoom(e);
    router.push(
      {
        pathname: `/${e.id}`,
      },
      undefined,
      { shallow: true }
    );
  });

  socket.on("setRooms", (e) => {
    setRooms(e);
  });

  socket.on("receiveMessages", (e) => {
    setMessages([...messages, e]);
  });

  const createRoom = async (req: GameRoom) => {
    socket.emit("createRoom", req);
  };

  const joinRoom = (req: GameRoom) => {
    socket.emit("joinRoom", req);
  };

  const sendMessage = (req: string) => {
    socket.emit("sendMessage", req);
  };

  return {
    sendMessage,
    createRoom,
    setCurMsg,
    joinRoom,
    curRoom,
    curMsg,
    rooms,
  };
};

export default useGameSocket;
