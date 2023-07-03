import { useContext, useEffect, useRef, useState } from "react";
import { GameRoom } from "types";
import { Connection } from "@/context/connection";
import { NextRouter } from "next/router";

export const useGameSocket = (
  router: NextRouter) => {
  const {
    socket,
    connected,
    curRoom,
    isLoading,
    setIsLoading,
    setCurRoom,
    setConnected,
    rooms,
    setRooms,
  } = useContext(Connection);
  const [curMsg, setCurMsg] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    !socket.connected && socket.connect(); // auto connect re-enabled here
    if (!socket) return;
    socket.on("connect", () => {
      console.log("socket connected", socket);
      setConnected(true);
      setTimeout(() => setIsLoading(false), 700);
      socket.on("disconnect", () => {
        console.log("socket disconnected");
        router.push(
          {
            pathname: `/`,
          },
          undefined,
          { shallow: true }
        );
        setConnected(false);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);


  useEffect(() => {
    socket.on("updateRoom", (e) => {
      setCurRoom(e);
      console.log("Room updated", e);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    socket.on("intData", (e) => {
      setRooms(e.rooms);
    });

    socket.on("setRooms", (e) => {
      console.log("Rooms set", e);
      setRooms(e);
    });
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (e) => {
      setMessages([...messages, e]);
      console.log("Message added", messages);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);


  useEffect(() => {
    socket.on("gotoRoom", (e) => {
      console.log("going to", e);
      const roomId = e.id;
      router.push(
        {
          pathname: `/${e !== 0 ? roomId : ""}`,
        },
        undefined,
        { shallow: true }
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createRoom = async (req: GameRoom) => {
    socket.emit("createRoom", req);
  };

  const leaveRoom = async () => {
    socket.emit("leaveRoom");
  };

  const readyUp = async () => {
    socket.emit("readyUp");
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
    connected,
    isLoading,
    joinRoom,
    curRoom,
    messages,
    readyUp,
    curMsg,
    socket,
    rooms,
  };
};

export default useGameSocket;
