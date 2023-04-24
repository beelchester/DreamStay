'use client'

import useCountries from '@/app/hooks/useCountries'
import { Listing, Reservation, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import Button from '../../Button'
import Image from 'next/image'
import {format} from 'date-fns'
import HeartButton from '../../HeartButton'

interface ListingCardProps {
        data : Listing
        reservation?: Reservation
        currentUser?: User
        disabled?: boolean
        onAction?: (id:string) => void
        actionLabel?: string
        actionId?: string
    }

const ListingCard:React.FC<ListingCardProps> = ({data, reservation, currentUser, disabled, onAction, actionLabel, actionId=""}
) => {

const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
          { currentUser &&
              <HeartButton
                  listingId={data.id}
              currentUser={currentUser}
              />
              }
          </div>
        </div>
        <div className="flex flex-col gap-1">
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="text-lg">
            {data.title}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            ₹ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );}

export default ListingCard

