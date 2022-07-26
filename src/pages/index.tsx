import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>What Am I Reading</title>
        <meta
          name="description"
          content="Share Quotes and Cool Readings With your Friends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        {!session && (
          <>
            Not Signed In
            <button
              className="p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </button>
          </>
        )}

        {session && (
          <>
            Signed In as {session.user?.name}
            <img src={session.user?.image} alt="" />
            <button
              className="p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
