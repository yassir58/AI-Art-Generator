'use client'

import ui from '~/styles/ui.module.css'
import { api } from "~/trpc/react"
import { useSession } from "next-auth/react"
import Card from "../_components/ui/Card"
import Modal from '../_components/ui/Moda'
import { Image } from '../feed/FeedScreen'
const Collection:React.FC = ()=>{

    const { status, data } = useSession({
        required: true,
        onUnauthenticated() {
          // The user is not authenticated, handle it here.
          console.log ('user is not authenticated')
        },
      })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {isLoading, data:collection} = api.post.getCollection.useQuery({
        userId:data?.user?.id ?? ''
    });

    if (isLoading)
      return (<div className='flex justify-center items-center w-full h-full'>

    <div className={`${ui.loader}`}></div>
  </div>)
    
    return (
        <div className={`${ui.gallery}`}>
         {collection?.map((image:Image, index:number)=>{
                return (
                    <Modal image={image} key={index}>
                        <Card image={image}/>
                    </Modal>
                )
            })}
        </div>
    )
}

export default Collection