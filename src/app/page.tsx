import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerAuthSession ()

  console.log ('session: ', session)

  redirect ('/generate');
  return (
    <div className="w-full h-full bg-darkBlue flex justify-center items-center overflow-hidden">
    </div>
  );
}


