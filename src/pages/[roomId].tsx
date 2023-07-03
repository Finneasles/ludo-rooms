import { useGameSocket } from "@/hooks/socket";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { Room } from "@/components/pages/room";

export default function RoomPage() {
  const router = useRouter();
  const { leaveRoom, socket, readyUp, connected, curRoom, isLoading } =
    useGameSocket(router);

  return (
    <Layout {...{ router, connected, isLoading }}>
      <Room {...{ router, curRoom, leaveRoom, readyUp, socket }} />
    </Layout>
  );
}
