/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import useGameSocket from "@/hooks/socket";
import { v4 as uuidv4 } from "uuid";

export const ChatBox = ({
  socket,
  router
}) => {
  const { curMsg, messages, setCurMsg, sendMessage } = useGameSocket(router);

  const handleInputChange = (event) => {
    setCurMsg(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage(curMsg);
      setCurMsg("");
    }
  };

  return (
    <div className="flex flex-col flex-grow w-full right-0 overflow-y-auto top-0 bg-gray-300">
      <div className="flex-grow overflow-auto">
        {messages.map((msg) => {
          return (
            <div key={uuidv4()}>
              {msg.author?.id !== socket.id ? (
                <div
                  className="flex w-full mt-2 space-x-3 max-w-xs"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="bg-green-600 p-3 rounded-r-lg rounded-bl-lg">
                      <p className="text-sm">
                        {msg.author.name}
                        {": "}
                        {msg.content}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {msg.date}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">
                        {msg.author.name}
                        {": "}
                        {msg.content}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {msg.date}
                    </span>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-gray-400 p-4">
        <input
          className="flex text-black items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={curMsg}
          placeholder="Type your message…"
        />
      </div>
    </div>
  );
};
