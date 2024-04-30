'use client'
import Link from "next/link"
import { SigninModal } from "./Moda";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { modalContext } from "~/lib/providers/modalProvider";

const Sidebar:React.FC  = () =>{

    const {setIsOpen} = useContext(modalContext);
    const { status, data } = useSession({
        required: true,
        onUnauthenticated() {
          // The user is not authenticated, handle it here.
          console.log ('user is not authenticated')
        },
      })

    //   if (status === "loading") {
    //     return "Loading or not authenticated..."
    //   }

    console.log ('session :', data)
    console.log ('status: ', status)
    const onOpen = () => setIsOpen?.(true);
    return (
        <div className='w-[60px] h-[100vh] fixed top-0 left-0 border-r-[1px] border-veryDarkGray flex flex-col justify-between items-center pb-6'>
            <div className='flex flex-col gap-16 justify-start items-center py-8'>
                <Link className={`sideLink`} href='/'>
                    <img src="/Logo.svg" alt="" />
                </Link>
                <div className='flex flex-col gap-4 justify-start items-center'>
                <Link className={`sideLink`} href='/generate'>
                    <img src="/Magic.svg" alt="" />
                </Link>
                <Link className={`sideLink`} href='/feed'>
                    <img src="/apps.svg" alt="" />
                </Link>
                <Link className={`sideLink`} href='/history'>
                    <img src="/Time_atack_duotone.svg" alt="" />
                </Link>
                <Link className={`sideLink`} href='/collection'>
                    <img src="/Folder_duotone_fill.svg" alt="" />
                </Link>
                </div>
            </div>
               {status == 'authenticated'? <img className='w-[40px] h-[40px] rounded-full' src={data?.user?.image??''}/> :  <button className='iconButton' onClick={onOpen}>
                    <img src="/signin.svg" alt="" />
                </button>}
        </div>
    )
}

export default Sidebar;