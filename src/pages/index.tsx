import { Inter } from "next/font/google";
import useGameSocket from "@/hooks/socket";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { rooms, createRoom, joinRoom } = useGameSocket({ router });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ul>
        {rooms.map((room) => (
          <li
          className="cursor-pointer"
            key={room.id}
            onClick={() => {
              joinRoom(room.id);
            }}
          >
            {room.name}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          createRoom({ name: "Hello World!" });
        }}
      >
        Create Room
      </button>
    </main>
  );
}
