'use client'
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { closeRentModal } from "@/app/features/rentModalSlice";
import { useState } from "react";
import { useMemo } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import CounterInput from "../inputs/CounterInput";
import ImageModal from "../inputs/ImageModal";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
    const [isLoading, setIsLoading] = useState(false)

    const {
            register,
            handleSubmit,
            formState: { errors },
            setValue,
            watch,
            reset,
        } = useForm<FieldValues>({
            defaultValues: {
                category: '',
                location:null,
                guestCount: 1,
                roomCount: 1,
                bathroomCount: 1,
                title: '',
                description: '',
                price: 1,
                imageSrc:'',
                }
            })

    const category = watch('category') 
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const title = watch('title')
    const description = watch('description')
    const price = watch('price')
    const imageSrc = watch('imageSrc')


    const setCustomValue = (id: string, value: any) => {
            setValue(id, value, { shouldValidate: true, shouldDirty: true,shouldTouch: true })
        }

    const onBack = () => {
        setStep(value => value - 1)
    }

    const onNext = () => {
        setStep(value => value + 1)
    }

    const router = useRouter()

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
            if (step !== STEPS.PRICE) {
                onNext()
                return
            }

            setIsLoading(true)

            axios.post('/api/listings', data)
            .then(()=>{
                    toast.success('Listing created successfully')
                    router.refresh()
                    reset()
                    setStep(STEPS.CATEGORY)
                    dispatch(closeRentModal())
                })
            .catch((err)=>{
                toast.error("Something went wrong")
            })
            .finally(()=>{
                setIsLoading(false)
                console.log(data)
            })
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

    let bodyContent = (
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
                    categories.map((item) => (
                        <div key={item.label}
                        className="col-span-1"
                        >
                           <CategoryInput 
                            label={item.label}
                            icon={item.icon}
                            selected={category === item.label}
                            onClick={(category)=>{
                                setCustomValue('category', category)
                                }}
                           /> 
                        </div>
                        ))
                }
        </div>
        </div>
    )

if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />
      </div>
    );
    }

    if (step === STEPS.INFO) {
    bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <CounterInput
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Guests" 
          subtitle="How many guests do you allow?"
        />
        <hr />
        <CounterInput
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms" 
          subtitle="How many rooms do you have?"
        />
        <hr />
        <CounterInput 
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms" 
          subtitle="How many bathrooms do you have?"
        />
      </div>
   ) } 

   if(step === STEPS.IMAGES) {
    bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading
            title = "Add a photo of your place"
            subtitle = "Show guests what your place looks like"
        />
        <ImageModal
            value={imageSrc}
            onChange={(value) => setCustomValue('imageSrc', value)}
        />
        </div>
    )
       }

    if(step === STEPS.DESCRIPTION) {
    bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading
            title = "Describe your place"
            subtitle = "What makes your place special?"
        />
        <Input 
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <hr />
        <Input 
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        </div>
    )
    }

    if(step === STEPS.PRICE) {
    bodyContent = (
        <div className="flex flex-col gap-8">
        <Heading
            title = "Set a price"
            subtitle = "How much do you want to charge per night?"
            />
            <Input
                formatPrice
                id="price"
                label="Price"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    }

        return (
        <Modal
            isOpen={isRentModal}
            onClose={()=>dispatch(closeRentModal())}
            onSubmit={handleSubmit(onSubmit)}
            title="Rent your home"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step===STEPS.CATEGORY?undefined:onBack}
            body={bodyContent}
        />
    );
    };

export default RentModal
