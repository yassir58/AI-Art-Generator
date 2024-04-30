import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {

  const session = await getServerAuthSession ()

  console.log ('session: ', session)
  return (
    <div className="w-full h-full bg-darkBlue flex justify-center items-center overflow-hidden">
    </div>
  );
}


