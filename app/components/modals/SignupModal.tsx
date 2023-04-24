'use client'

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { useCallback, useState } from "react"
import {FieldValues,SubmitHandler,useForm} from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { closeSignupModal, openSignupModal } from "@/app/features/signupModalSlice"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import {FcGoogle} from 'react-icons/fc'
import { openLoginModal } from "@/app/features/loginModalSlice"
import { signIn } from "next-auth/react"

const SignupModal = () => {

    const showModal = useSelector((state: any) => state.signupModal.isOpen)
    const [isLoading, setisLoading] = useState(false)

    const dispatch = useDispatch()
    
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
            defaultValues:{
                    name: "",
                    email: "",
                    password: "",
                }
        });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true)

        axios.post('/api/register', data)
        .then(()=>{
            setTimeout(() => {
            dispatch(closeSignupModal())
            }, 300);
            toast.success('Account created successfully')
            dispatch(openLoginModal())
            })
        .catch((err)=>{
            toast.error('Something went wrong')
        }
        )
        .finally(()=>{
            setisLoading(false)
        }
        )
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome to DreamStay"
                subtitle="Create an account!"
            />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4">
            <hr/>
            <Button 
                outline
                label = "Continue with Google"
                icon = {FcGoogle}
                onClick={() => signIn('google')} 
            />
            <Button 
                outline
                label = "Continue with Github"
                icon = {AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
      <div className="flex flex-row justify-center items-center gap-2">
        <div>Already have an account?</div>
          <div 
            onClick={() => {
                    dispatch(closeSignupModal())
                    dispatch(openLoginModal())
                }}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</div>
        </div>
        </div>
      </div>
    )

  return (
  <Modal
    isOpen={showModal}
    disabled={isLoading}
    title="Sign up"
    onClose={() => dispatch(closeSignupModal())}
    actionLabel="Continue"
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
  />
  )
}

export default SignupModal
