import { Inter } from "next/font/google";
import { useGameSocket } from "@/hooks/socket";
import { useRouter } from "next/router";
import { ChatBox } from "@/components/chatbox";
import { GameBoard } from "@/components/gameboard";
import { Layout } from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

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
    <Layout>
      <main
        className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
      >
        <div className="w-full flex justify-center items-center h-screen bg-gray-200">
          {JSON.stringify(curRoom)}
          <button
            onClick={() => {
              leaveRoom();
            }}
          >
            Leave Room
          </button>
          <GameBoard />
        </div>
        <ChatBox
          {...{ socket, messages, curMsg, handleKeyDown, handleInputChange }}
        />
      </main>
    </Layout>
  );
}
