import { Inter } from "next/font/google";
import useGameSocket from "@/hooks/socket";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { Lobby } from "@/components/pages/lobby";


export default function Home() {
  const router = useRouter();
  const { rooms , createRoom, joinRoom, connected, isLoading } = useGameSocket(router);

  return (
    <Layout {...{ isLoading, router, connected }}>
      <Lobby {...{ rooms, createRoom, joinRoom }} />
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch data from an API or any other data source
  const data = { /* your data */ };

  return {
    props: {
      data,
    },
  };
}