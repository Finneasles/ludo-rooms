import { Inter } from "next/font/google";
import { useGameSocket } from "@/hooks/socket";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const ChatBox = ({
  socket,
  messages,
  curMsg,
  handleKeyDown,
  handleInputChange,
}) => {
  return (
    <aside
      id="chat-button-sidebar"
      aria-label="Sidebar"
      className="fixed top-0 right-0 z-40 w-96 h-screen transition-transform  overflow-y-auto flex flex-col flex-grow max-w-xl bg-white shadow-xl overflow-hidden"
    >
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {messages.map((msg) => {
          return (
            <>
              {msg.author?.id !== socket.id ? (
                <div
                  key={msg.id}
                  className="flex w-full mt-2 space-x-3 max-w-xs"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
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
            </>
          );
        })}
      </div>

      <div className="bg-gray-300 p-4">
        <input
          className="flex text-black items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={curMsg}
          placeholder="Type your message…"
        />
      </div>
    </aside>
  );
};

export const GameBoard = () => {
  return (
    <div className="w-72 h-72 bg-white shadow-md rounded-lg flex flex-wrap">
      {/* Red Home */}
      <div className="w-1/3 h-1/3 bg-red-600"></div>
      {/* Red Track */}
      <div className="w-1/3 h-2/3 flex flex-wrap">
        <div className="w-1/3 h-1/3 bg-red-200"></div>
        <div className="w-1/3 h-1/3 bg-red-600"></div>
        <div className="w-1/3 h-1/3 bg-red-200"></div>
      </div>
      {/* Yellow Home */}
      <div className="w-1/3 h-1/3 bg-yellow-600"></div>
      {/* Yellow Track */}
      <div className="w-2/3 h-1/3 flex flex-wrap">
        <div className="w-1/3 h-1/3 bg-yellow-200"></div>
        <div className="w-1/3 h-1/3 bg-yellow-600"></div>
        <div className="w-1/3 h-1/3 bg-yellow-200"></div>
      </div>
      {/* Green Home */}
      <div className="w-1/3 h-1/3 bg-green-600"></div>
      {/* Green Track */}
      <div className="w-1/3 h-2/3 flex flex-wrap">
        <div className="w-1/3 h-1/3 bg-green-200"></div>
        <div className="w-1/3 h-1/3 bg-green-600"></div>
        <div className="w-1/3 h-1/3 bg-green-200"></div>
      </div>
      {/* Blue Home */}
      <div className="w-1/3 h-1/3 bg-blue-600"></div>
      {/* Blue Track */}
      <div className="w-2/3 h-1/3 flex flex-wrap">
        <div className="w-1/3 h-1/3 bg-blue-200"></div>
        <div className="w-1/3 h-1/3 bg-blue-600"></div>
        <div className="w-1/3 h-1/3 bg-blue-200"></div>
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const {
    leaveRoom,
    curRoom,
    socket,
    messages,
    curMsg,
    setCurMsg,
    sendMessage,
  } = useGameSocket({
    router,
  });

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
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      {JSON.stringify(curRoom)}
      <button
        onClick={() => {
          leaveRoom();
        }}
      >
        Leave Room
      </button>

      <div className="w-full flex justify-center items-center h-screen bg-gray-200">
        <GameBoard/>
      </div>
      <ChatBox
        {...{ socket, messages, curMsg, handleKeyDown, handleInputChange }}
      />
    </main>
  );
}
