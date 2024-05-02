'use client'
import { useSession } from "next-auth/react";
import HistoryCard from "../_components/ui/HistoryCard"
import { api } from "~/trpc/react"
import ui from '~/styles/ui.module.css'

export interface Image {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
    creatorName: string;
    prompt: string;
    negative: string | null;
    width: number;
    height: number;
    guidence: number;
}

const History:React.FC = ()=>{


    const {status, data:session} = useSession({
        required: true,
        onUnauthenticated() {
          // The user is not authenticated, handle it here.
          console.log ('user is not authenticated')
        },
      })
    const {isLoading, data} = api.post.getHistory.useQuery({userId:session?.user?.id??''});
    if (isLoading)
        return (<div className='flex justify-center items-center w-full h-full'>
  
      <div className={`${ui.loader}`}></div>
    </div>)
    return (
        <div className={`flex flex-col justify-start items-start gap-4 w-full max-h-[70vh] overflow-y-auto`}>
            {
                data?.map((image:Image, index:number)=>{
                    return (
                        <HistoryCard image={image} key={index}/>
                    )
                })
            }
         </div>
    )
}

export default History;