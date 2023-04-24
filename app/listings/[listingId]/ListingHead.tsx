'use client'

import Heading from '@/app/components/Heading'
import HeartButton from '@/app/components/HeartButton'
import useCountries from '@/app/hooks/useCountries'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface ListingHeadProps {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser?: User | null
    }

const ListingHead = ( {title, imageSrc, locationValue, id, currentUser}: ListingHeadProps
) => {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)

  return (
   <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
      { currentUser &&
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        }
        </div>
      </div>
    </>)
}

export default ListingHead
