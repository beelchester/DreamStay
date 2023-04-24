'use client'

import Container from '@/app/components/Container'
import { categories } from '@/app/components/navbar/Categories'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { openLoginModal } from '@/app/features/loginModalSlice'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingReservation from './ListingReservation'
import { Range } from 'react-date-range'
import { SafeListing, SafeReservation, SafeUser } from '@/app/types'

const intialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key : 'selection'
    }

interface ListingClientProps {
        reservations?: SafeReservation[]
        listing: SafeListing  & { user: SafeUser }
        currentUser: SafeUser | null
    }

const ListingClient:React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
    }) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(intialDateRange)

    const reservedDates = useMemo(() => {
            let dates:Date[] = []
            reservations.forEach((reservation) => {
                    const range = eachDayOfInterval({
                            start: new Date(reservation.startDate),
                            end: new Date(reservation.endDate)
                        })
            dates = [...dates, ...range]
                })
            return dates
        }, [reservations])

    const createReservation = useCallback(()=>{
            if (!currentUser) {
                return dispatch(openLoginModal())
            }

            setIsLoading(true)
            
            axios.post('/api/reservations', {
                    totalPrice,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    listingId: listing?.id
                })
            .then(()=>{
                    toast.success('Reservation created successfully')
                    setDateRange(intialDateRange)
                    router.push('/trips')
                })
            .catch(()=>{
                    toast.error('Something went wrong')
                })
            .finally(()=>{
                    setIsLoading(false)
                })
        }, [currentUser, dispatch, totalPrice, dateRange, listing?.id, router])

    useEffect(() => {
            if(dateRange.startDate && dateRange.endDate){
                    const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)
                    const price = dayCount * listing.price
                    if (dayCount && listing.price) {
                        setTotalPrice(price)
                    }
                    else{
                        setTotalPrice(listing.price)
                    }
                }

        }, [reservedDates, dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((category) => category.label === listing.category)
    }, [listing.category])

  return (
  <Container>
    <div className="
          max-w-screen-lg 
          mx-auto
          pt-[7.5rem]
        ">

        <div className='
        flex flex-col gap-6'>
                  <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='
                order-first
                md:order-last
                mb-10
                md:col-span-3
            '>

                <ListingReservation
                    price={listing.price}
                    totalPrice={totalPrice}
                    dateRange={dateRange}
                    onChangeDate={(value) => setDateRange(value)}
                    onSubmit={createReservation}
                    disabled={isLoading}
                    disabledDates={reservedDates}
                />

            </div>
            </div>
        </div>
        </div>

    </Container>
  )
}

export default ListingClient

