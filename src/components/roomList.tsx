import { v4 as uuidv4 } from "uuid";

export const RoomList = (props) => {
  return (
    <div className="flex-grow bg-purple-200 overflow-auto space-y-2">
      {props.rooms.map((room) => (
        <div
          className="cursor-pointer bg-red-200 w-full h-32"
          key={uuidv4()}
          onClick={() => {
            props.joinRoom(room.id);
          }}
        >
          {room.options.name}
        </div>
      ))}
    </div>
  );
};
