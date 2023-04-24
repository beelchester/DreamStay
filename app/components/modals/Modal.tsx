'use client'

import { useCallback, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import Button from "../Button"

interface ModalProps {
        isOpen?: boolean
        onClose: () => void
        onSubmit : () => void
        title?: string
        body?: React.ReactElement
        footer?: React.ReactElement
        actionLabel:string
        secondaryActionLabel?:string
        secondaryAction?:() => void
        disabled?:boolean
    }

const Modal:React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    secondaryActionLabel,
    secondaryAction,
    disabled
    }) => {

    const [isModalOpen,setIsModalOpen] = useState(isOpen)

    useEffect(() => {
        setIsModalOpen(isOpen)
    }, [isOpen])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
        setTimeout(() => {
            onClose()
        }, 300);
    }, [disabled,onClose,secondaryAction,secondaryActionLabel])


    const secondaryActionHandler = useCallback(() => {
        if(disabled || !secondaryAction) return
        secondaryAction()
        }, [disabled,secondaryAction])

    if (!isOpen) {
    return null;
  }


  return (
  <>
  <div
    className="
    flex
    justify-center
    items-center
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0 
    z-50
    outline-none
    focus:outline-none
    bg-neutral-800/70
    "
  >
  <div className="
    relative
    w-full
    md:w-4/6
    lg:w-3/6
    xl:w-2/5
    my-6
    mx-auto
    h-full
    lg:h-auto
    md:h-auto
  ">
  <div className={`
    translate
    duration-300
    h-full
    ${isModalOpen ? 'opacity-100' : 'opacity-0'}
    {isModalOpen ? 'translate-y-0' : 'translate-y-full'}
  `}>
    <div className={`
    translate
    h-full
    lg:h-auto
    md:h-auto
    border-0
    rounded-lg
    shadow-lg
    relative
    flex
    flex-col
    w-full
    bg-white
    outline-none
    focus:outline-none
    `}>
    <div className="
    flex
    items-center
    justify-center
    p-6
    rounded-t
    relative
    border-b-[1px]
    ">
        <button
className="
    absolute
    p-1
    border-0
    transition
    left-9
    hover:opacity-70
"
onClick={closeModal}
        >
            <IoMdClose size={18} />
        </button>
        <div className="text-lg font-semibold">
        {title}
        </div>
    </div>
    <div className="relative p-6 flex-auto">
        {body}
    </div>
    <div className=" flex flex-col gap-2 p-6">
<div
className="flex flex-row gap-4 w-full items-center"
>
{ secondaryActionLabel &&
<Button 
label={secondaryActionLabel}
onClick={secondaryActionHandler}
disabled={disabled}
outline
/>
}<Button 
label={actionLabel}
onClick={onSubmit}
disabled={disabled}
/>

</div>
{footer}
</div>
    </div>
  </div>
</div>
  </div>
  </>
  )
}

export default Modal
