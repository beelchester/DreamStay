'use client'

import Image from 'next/image'
import {useRouter} from 'next/navigation'

export default function Logo() {
    const router = useRouter()

return (
<Image
    onClick={() => router.push('/')}
    src ="/images/logo.png"
    alt="logo"
    width={120}
    height={100}
    className='cursor-pointer w-24 sm:w-auto pt-[0.6rem] sm:pt-0 pb-1 sm:pb-0'
/>
)
}
