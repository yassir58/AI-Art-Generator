'use client'
import { createContext } from "react";
import {SessionProvider} from 'next-auth/react';
import { Toaster } from 'react-hot-toast';


const GlobalContext = createContext(null);

interface props {
    children:React.ReactNode
}
const GlobaleProvider:React.FC<props> = ({children})=>{
    return (
        <GlobalContext.Provider value={null} >

            <SessionProvider>
                <Toaster/>
            {children}
            </SessionProvider>
        </GlobalContext.Provider>
    )
}

export default GlobaleProvider;