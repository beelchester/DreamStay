'use client'
import {AiOutlineMenu} from 'react-icons/ai'
import User from '../User'
import { useState } from 'react'
import MenuItem from './MenuItem'
import { useDispatch } from 'react-redux'
import { openSignupModal } from '@/app/features/signupModalSlice'


const NavMenu = () => {

    const [isOpen,setIsOpen] = useState(false)
    
    const dispatch = useDispatch()

  return (
    <div
        className="relative"
    >
        <div
            className="
            flex flex-row items-center gap-3
            "
        >
        <div
            className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                hover:bg-neutral-100
                transition
                cursor-pointer
            "
        >
            Rent your home
        </div>
        <div 
        onClick={() => setIsOpen(!isOpen)}
        className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex flex-row items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
        ">

            <AiOutlineMenu />
            <div className='hidden md:block'>
            <User/>
            </div>

        </div>
        </div>
        {
            isOpen && (
                <div
                    className='
                    absolute
                    rounded-xl
                    shadow-lg
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    top-12
                    right-0
                    text-sm
                    overflow-hidden

                    '
                >
                <div
                    className='
                        flex flex-col cursor-pointer
                    '
                >
                <>
                    <MenuItem
                        onClick={()=>{}}
                        label='Login'
                    />
                </>
                <MenuItem
                onClick={()=>{
                        dispatch(openSignupModal())
                    }}
                        label='Sign Up'
                            />
                </div>
                </div>
            )
            }

    </div>
  )
}

export default NavMenu
