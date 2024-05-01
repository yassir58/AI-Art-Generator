
'use client'
import {useState, useContext, createContext} from 'react'
import {modalContext} from '~/lib/providers/modalProvider'
import { signIn } from 'next-auth/react'
interface props{
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
    children:React.ReactNode
        
}



export const SigninModal:React.FC = ({})=>{
 
    const {isOpen, setIsOpen} = useContext(modalContext);
    const onClose = () => {
        setIsOpen?.(false);
    }
    return (
        <>

            <div className={`z-40 w-[100vw] h-[100vh] bg-black/75 fixed top-0 left-0 ${isOpen?'block':'hidden'}`} onClick={onClose}></div>
            <div className={`fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-[500px] h-[240px] rounded-md shadow-sm bg-darkBlue  justify-center items-center p-8 ${isOpen?'flex':'hidden'} z-50  gap-8`}>
               
               <button className='iconButton absolute top-4 right-4' onClick={onClose}>
                <img src="/Close-1.svg" alt="" />
               </button>
              <div className='flex flex-col justify-start items-center gap-4'> 
                <h1 className='text-xl text-veryLightGray font-semibold'>Sign In to continue</h1>
                <button className='largeSecondary w-[400px]' onClick={()=> signIn ('github', {callbackUrl:'/'})}>
                    <img src='/github.svg'/>
                    Signin with github
                </button>
              </div>
            </div>
        </>
    )
}


interface modalProps {
    isOpen?:boolean;
    setIsOpen?:(state:boolean)=>void

}
export const localModalContext = createContext<modalProps> ({})
const Modal:React.FC<props> = ({image, children})=>{

    const [isOpen, setIsOpen] = useState (false)

    const onOpen = ()=> setIsOpen (true)
    const onClose = ()=> setIsOpen (false)

    return (
        <>
        <div className='' >
           <localModalContext.Provider value={{isOpen, setIsOpen}}> {children}</localModalContext.Provider>
        </div>
            <div className={`z-20 w-[100vw] h-[100vh] bg-black/75 absolute top-0 left-0 ${isOpen?'block':'hidden'}`} onClick={onClose}></div>
            <div className={`fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-[60vw] h-[80vh] rounded-md shadow-sm bg-darkBlue  justify-start items-start p-8 ${isOpen?'flex':'hidden'} z-30  gap-8`}>
               
               <button className='iconButton absolute top-4 right-4' onClick={onClose}>
                <img src="/Close.svg" alt="" />
               </button>
                <div className='flex flex-col justify-start items-start gap-4 w-[300px]'>
                    <img src={image.url} alt="" className="w-[280px] rounded-md border-[6px] border-veryDarkGray" />
                    <button className='primaryButton '>
                        <img src={'/download.svg'} alt="" />
                        Download
                    </button>
                </div>
                <div className='flex flex-col justify-start items-start gap-3  w-full'>
                <div className='flex flex-col gap-3 justify-start items-start max-h-[360px] overflow-y-auto'>
                <div className="flex-col flex justify-start items-start gap-2 ">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Prompt Details</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.prompt}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Created On</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.createdAt.toISOString()}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Seed</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.guidence}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Negative Prompt</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.negative}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Input Resolution</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.width}</p>
                    </div>
                </div>
                    <button className='largeSecondary'>
                        <img src="/Magic.svg"  alt="" />
                        Generate with this settings
                    </button>
                </div>
            </div>
        </>
    )
}


export default Modal