'use client'

import Image from 'next/image'
import {useRouter} from 'next/navigation'

export default function Logo() {
    const router = useRouter()

return (
<Image
    src ="/images/logo.png"
    alt="logo"
    width={120}
    height={100}
/>
)
}
