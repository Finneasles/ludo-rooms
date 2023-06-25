import { useContext, useEffect, useRef, useState } from "react";
import { GameRoom } from "types";
import { Connection } from "@/context/connection";
import { NextRouter } from "next/router";

export const useGameSocket = (
  router: NextRouter) => {
  const { socket } = useContext(Connection);
  const [rooms, setRooms] = useState([]);
  const [curMsg, setCurMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [curRoom, setCurRoom] = useState({});

  useEffect(() => {
    socket.on("intData", (e) => {
      setRooms(e.rooms);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    socket.on("updateRoom", (e) => {
      setCurRoom(e);
      console.log("Room updated", e);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curRoom]);

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
  }, [curRoom, router]);

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
    joinRoom,
    messages,
    readyUp,
    curRoom,
    curMsg,
    socket,
    rooms,
  };
};

export default useGameSocket;
