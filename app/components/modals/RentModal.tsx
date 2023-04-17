'use client'
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { closeRentModal } from "@/app/features/rentModalSlice";
import { useState } from "react";
import { useMemo } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {

    const isRentModal = useSelector((state:any) => state.rentModal.isOpen)
    console.log(isRentModal)
    const dispatch = useDispatch()

    const [step, setStep] = useState(STEPS.CATEGORY)

    const onBack = () => {
        setStep(value => value - 1)
    }

    const onNext = () => {
        setStep(value => value + 1)
    }

    const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);

    let bodycontent = (
        <div className="flex flex-col gap-8">
        <Heading
        title="Which of these describes your place?"
        subtitle="Pick a category"
        />
        <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
            "
        >
            {
                    categories.map((category) => (
                        <div key={category.label}
                        className="col-span-1"
                        >
                           <CategoryInput 
                            label={category.label}
                            icon={category.icon}
                            selected={false}
                            onClick={()=>{}}
                           /> 
                        </div>
                        ))
                }
        </div>
        </div>
    )

    return (
        <Modal
            isOpen={isRentModal}
            onClose={()=>dispatch(closeRentModal())}
            onSubmit={()=>dispatch(closeRentModal())}
            title="Rent your home"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step===STEPS.CATEGORY?undefined:onBack}
            body={bodycontent}
        />
    );
    };

export default RentModal
