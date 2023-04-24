'use client'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { openSignupModal } from '@/app/features/signupModalSlice'
import { openLoginModal } from '@/app/features/loginModalSlice'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { openRentModal } from '@/app/features/rentModalSlice'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/app/types'

interface NavMenuProps {
    currentUser?: SafeUser | null
}

const NavMenu:React.FC<NavMenuProps> = ({
    currentUser,
    }) => {


console.log(currentUser)
    const [isOpen,setIsOpen] = useState(false)
    
    const dispatch = useDispatch()
    const isLogin = useSelector((state:any) => state.loginModal.isOpen)
    const isRentModal = useSelector((state:any) => state.rentModal.isOpen)

    const toggleRent = useCallback(() => {
        if (!currentUser) {
            dispatch(openLoginModal())
        }
        else{
        dispatch(openRentModal())
        }
    },[currentUser, isLogin,isRentModal])

    const router = useRouter()

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
        onClick={toggleRent}
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
            <Avatar src={currentUser?.image}/>
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
                {currentUser ? (
                <>
                <MenuItem 
                  label="My trips" 
                  onClick={()=>{router.push('/trips')}}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={()=>{router.push('/favorites')}}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={()=>{router.push('/reservations')}}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={()=>{router.push('/properties')}}
                />
                <MenuItem 
                  label="Rent your home" 
                  onClick={toggleRent}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
                ):(
                <>
                    <MenuItem
                        onClick={()=>{dispatch(openLoginModal())}}
                        label='Login'
                    />
                <MenuItem
                onClick={()=>{
                        dispatch(openSignupModal())
                    }}
                        label='Sign Up'
                            />
                </>
                )}
                </div>
                </div>
            )
            }

    </div>
  )
}

export default NavMenu
