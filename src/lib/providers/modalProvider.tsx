
'use client'
import { createContext, useState } from "react";

interface ModalContextType {
    isOpen?:boolean
    setIsOpen?:(value:boolean) => void
}
export const modalContext = createContext<ModalContextType>({});

interface props {
    children:React.ReactNode
}

export const ModalProvider:React.FC<props> = ({children})=>{

    const [isOpen, setIsOpen] = useState (false)

    return (
        <modalContext.Provider value={{isOpen, setIsOpen}}>
            {children}
        </modalContext.Provider>
    )
}