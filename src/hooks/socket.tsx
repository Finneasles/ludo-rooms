import { useContext, useEffect, useState } from "react";
import { GameRoom } from "types";
import { Connection } from "@/context/connection";
import { NextRouter } from "next/router";

export const useGameSocket = ({
  router,
}: { router?: NextRouter } | undefined) => {
  const { socket } = useContext(Connection);
  const [rooms, setRooms] = useState([]);
  const [curRoom, setCurRoom] = useState({});
  const [curMsg, setCurMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("intData", (e) => {
      setCurRoom(e.room);
      setRooms(e.rooms);
    });

    socket.on("gotoRoom", (e) => {
      console.log("going to", e);
      const roomId = e.id;
      router.push(
        {
          pathname: `/${roomId !== 0 ? roomId : ""}`,
        },
        undefined,
        { shallow: true }
      );
    });

    socket.on("setRooms", (e) => {
      console.log("Rooms set", e);
      setRooms(e);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (e) => {
      setMessages([...messages, e]);
      console.log("Message added", messages);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const createRoom = async (req: GameRoom) => {
    socket.emit("createRoom", req);
  };

  const leaveRoom = async () => {
    socket.emit("leaveRoom");
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
    leaveRoom,
    setCurMsg,
    joinRoom,
    messages,
    curRoom,
    curMsg,
    socket,
    rooms,
  };
};

export default useGameSocket;
