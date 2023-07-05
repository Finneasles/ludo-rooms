/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { GameBoard } from "@/components/gameboard";
import { ChatBox } from "@/components/chatbox";
import { Button } from "../button";
import { v4 as uuidv4 } from "uuid";

export const Room = (props) => {
  return (
    <div className="h-screen space-x-0 md:space-x-4 flex flex-col md:flex-row justify-center items-center overflow-hidden">
      <div className="bg-red-200 h-[128px] md:h-[512px] w-full md:w-[128px] flex flex-col space-y-4">
        {props.curRoom.players.map((player) => {
          return (
            <div key={uuidv4()} className="h-12 w-full bg-yellow-200">
              <div>{player.name}</div>
              <div>{!player.ready ? "Not ready" : "Ready"}</div>
              <div>{player.role}</div>
            </div>
          );
        })}
      </div>

      <div className=" w-full md:w-[768px] h-[512px] flex-col transition-all right-0 overflow-hidden top-0 bg-purple-300">
        <GameBoard />
      </div>

      <div className="bg-red-200 h-[256px] md:h-[512px] w-full md:w-[256px] flex-col flex ">
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              props.leaveRoom();
            }}
          >
            Leave Room
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              props.readyUp();
            }}
          >
            {"Ready"}
          </Button>
        </div>
        <ChatBox {...{ socket: props.socket, router: props.router }} />
      </div>
    </div>
  );
};
