import { Button } from "@/components/button";
import { useState } from "react";

export const CreateRoomPopup = (props) => {
 const [ roomOptions, setRoomOptions] = useState({name: "" });
  return (
    <div className="absolute p-2 flex justify-center items-center h-full w-full backdrop-blur-sm bg-opacity-50 bg-black">
      <div className="h-[300px] flex-col w-full md:w-[512px] transition-all right-0 overflow-y-auto top-0 bg-gray-300">
        <div className="flex flex-col h-full">
          <div className="flex-none h-14">
            <Button
              onClick={(e) => {
                e.preventDefault();
                props.setCreatePopup(false);
              }}
            >
              Close
            </Button>
          </div>
          <div className="flex-grow  overflow-hidden bg-purple-200 p-2">
            <input
              className="text-black"
              placeholder={"Room Name..."}
              onChange={(e) => setRoomOptions({ name: e.target.value })}
            />
          </div>{" "}
          <div className="flex-none h-14">
            <Button
              onClick={(e) => {
                e.preventDefault();
                props.createRoom(roomOptions);
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
