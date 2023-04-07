'use client'
import { useState, useEffect } from "react"

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
    <>
        {children}
    </>
  )
}

export default ClientOnly
