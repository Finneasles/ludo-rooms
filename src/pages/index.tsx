import { Inter } from "next/font/google";
import useGameSocket from "@/hooks/socket";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { rooms, createRoom, joinRoom } = useGameSocket(router);

  return (
    <Layout>
      <div className="h-[300px] w-96 right-0 overflow-y-auto top-0 bg-gray-300">
        <div className="flex flex-col flex-grow overflow-auto space-y-2">
        {rooms.map((room) => (
          <div
            className="cursor-pointer bg-red-200 w-full h-12"
            key={room.id}
            onClick={() => {
              joinRoom(room.id);
            }}
          >
            {room.options.name}
          </div>
        ))}

        </div>
      </div>
      <button
        onClick={() => {
          createRoom({ name: "Hello World!" });
        }}
      >
        Create Room
      </button>
    </Layout>
  );
}
