'uce client'
import { api } from '~/trpc/react';
import ui from '../../../styles/ui.module.css'
import { useSession } from 'next-auth/react';
import { localModalContext } from './Moda';
import {useContext} from 'react'
import { usePathname } from 'next/navigation';
interface props {
    image: {
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
}

const Card:React.FC<props> = ({image})=>{

    const path = usePathname ()
    const { status, data } = useSession({
        required: true,
        onUnauthenticated() {
          // The user is not authenticated, handle it here.
          console.log ('user is not authenticated')
        },
      });
    const {setIsOpen} = useContext(localModalContext)
    const addToCollection = api.post.addToCollection.useMutation ({
        onSuccess:()=>{
            console.log ('added to collection successfully')
        },
        onError: ()=> console.log ('failed to add item to collection')
    })
    return (
        <div className='w-[230px] gap-4 h-auto  z-10' >
            <div className={`${ui.imageItem}`} onClick={()=>setIsOpen?.(true)}>
                {image?.url ? <img src={image.url} alt="" className='hover:opacity-85'/> : <SkeletonCard height='h-[230px]'/>  }
            <div className='flex w-[230px] justify-between items-center '>
                <div className='flex justify-start items-center gap-3 bottom-0 left-0'>
                    <div className='w-[30px] h-[30px] rounded-full bg-mediumGray flex justify-center items-center'>
                    <img src="/profile.svg" alt="" className="w-5"/>
                    </div>
                    <h1 className='text-sm text-veryLightGray font-[500]'>{image.creatorName}</h1>
                </div>
                <button className={`${path == '/collection' ? 'iconButtonActive' : 'iconButton'}`} onClick={async ()=>{
                   await addToCollection.mutateAsync({imageId: image.id??'', userId:data?.user?.id??''})
                }}>
                    <img src="/bookmark.svg" alt="" />
                </button>
            </div>
            </div>

        </div>
    )
}


interface skeletonProps {
    height: string
}
export const SkeletonCard:React.FC<skeletonProps> = ({height}) =>{
    return (
        <div role='status' className={`w-[230px] ${height} rounded-md bg-gray dark:bg-gray-700 animate-pulse `}>
            <p className='text-transparent'>text</p>
        </div>
    )
}

export const HorizontalCard:React.FC = ()=>{
    return (
        <div role='status' className={`h-[230px] w-full rounded-md bg-gray dark:bg-gray-700 animate-pulse `}>
        <p className='text-transparent'>text</p>
    </div>
    )
}
export default Card