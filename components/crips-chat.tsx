'use client'

import { useEffect } from "react"
import { Crisp} from 'crisp-sdk-web'


export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure('10fe1314-3f7b-4103-8607-13e9c96a192f')
    }, [])

    return null;
}