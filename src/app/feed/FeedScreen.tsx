/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { api } from "~/trpc/react"
import Card, {SkeletonCard} from "../_components/ui/Card";
import Modal from "../_components/ui/Moda";
import ui from '~/styles/ui.module.css'
import {useState, useEffect } from 'react'

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

interface props {
    keyword:string
}
const FeedScreen:React.FC = () =>{
   
    const {isLoading, data} = api.post.getImages.useQuery();
    const [list, setList] = useState<Image[]>([])
    const [keyword, setKeyword] =useState ('');

    useEffect(()=>{
        if (data && keyword == '') setList(data??[])
        else{
            const filtered = data?.filter((image:Image)=> image.prompt.includes(keyword))
            setList(filtered??[])
        }
    }, [data, keyword]);
    if (isLoading) return (
        <div className='w-[88%] p-6 h-full flex justify-start items-start  flex-col'>
               <form className='border-[1px] border-veryDarkGray rounded-lg w-[400px] flex justify-between p-2'>
                <input onChange={(e)=>setKeyword (e.target.value)} type="text" className='bg-transparent outline-none border-none text-veryLightGray placeholder:text-[#535967] placeholder:text-sm placeholder:font-[500] flex-1'  placeholder='search images by keyworkds'/>
                <img src="/Search.svg" alt="" />
            </form>
            <div className={`${ui.gallery} min-h-[80vh]`}>
                <SkeletonCard height="h-[260px]"/>
                <SkeletonCard height="h-[260px]"/>
                <SkeletonCard height="h-[260px]"/>
                <SkeletonCard height="h-[260px]"/>
                {/* <SkeletonCard height="h-[60px]"/>
                <SkeletonCard height="h-[60px]"/>
                <SkeletonCard height="h-[60px]"/>
                <SkeletonCard height="h-[60px]"/> */}
         </div>
        </div>
    )
    if (!data) return <div>No data</div>
    console.log ('data: ', data)
    return (
        <div className='w-[88%] p-6 h-full flex justify-start items-start  flex-col'>
            <form className='border-[1px] border-veryDarkGray rounded-lg w-[400px] flex justify-between p-2'>
                <input onChange={(e)=>setKeyword (e.target.value)} type="text" className='bg-transparent outline-none border-none text-veryLightGray placeholder:text-[#535967] placeholder:text-sm placeholder:font-[500] flex-1'  placeholder='search images by keyworkds'/>
                <img src="/Search.svg" alt="" />
            </form>
        <div className={`${ui.gallery} min-h-[80vh]`}>
            {list?.map((image:Image, index:number)=>{
                return (
                    <Modal image={image} key={index}>
                        <Card image={image}/>
                    </Modal>
                )
            })}
         </div>
        </div>
    )

}

export default FeedScreen