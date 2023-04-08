'use client'
import { useDispatch, useSelector } from "react-redux"
import Container from "../Container"
import Logo from "./Logo"
import NavMenu from "./NavMenu"
import Search from "./Search"
import { openSignupModal } from "@/app/features/signupModalSlice"
import { useEffect } from "react"

const Navbar = () => {

    const modal = useSelector((state: any) => state.signupModal.isOpen)
    console.log(modal)
    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(openSignupModal())
    console.log(modal)
    }, [])

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm"
    >
    <div className="py-4 border-b-[1px]"
    >
    <Container>
    <div  className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          ">

    <Logo/>
    <Search/>
    <NavMenu/>
    </div>
    </Container>


    </div>
    </div>
  )
}

export default Navbar
