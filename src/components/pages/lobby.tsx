/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { RoomList } from "@/components/roomList";
import { Button } from "../button";
import { CreateRoomPopup } from "@/components/createRoomPopup";

export const Lobby = (props) => {
  const [createPopup, setCreatePopup] = useState(false);
  return (
    <div className="h-screen flex justify-center items-center">
      {!createPopup ? null : (
        <CreateRoomPopup {...{ setCreatePopup, createRoom: props.createRoom }} />
      )}
      <div className="h-[512px] flex-col w-[768px] right-0 overflow-y-auto top-0 bg-gray-300">
        <div className="flex flex-col h-full">
          <div className="flex-none w-14 h-14">01</div>
          <RoomList {...{ rooms: props.rooms, joinRoom: props.joinRoom }} />
          <div className="flex-none w-14 h-14">
            <Button
              onClick={(e) => {
                setCreatePopup(true);
                e.preventDefault();
              }}
            >
              Create Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
