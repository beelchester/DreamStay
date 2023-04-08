'use client'
import { useState, useEffect } from "react"
import {store} from '../store'
import { Provider } from "react-redux"
import ToasterProvider from "../ToasterProvider"

interface clientOnlyProps {
    children: React.ReactNode
    }

const ClientOnly:React.FC<clientOnlyProps> = ({children}) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

  return (
    <Provider store={store}>
        <ToasterProvider />
        {children}
    </Provider>
  )
}

export default ClientOnly
