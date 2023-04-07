'use client'
import Image from 'next/image';

export default function User() {

    return (
        <Image
            alt='User'
            className='rounded-full'
            height={30}
            width={30}
            src="/images/placeholder.jpg"
        />
    )
    }
