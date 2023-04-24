'use client'
import { PuffLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='
    h-[70vh]
    pt-[7.5rem]
    flex flex-col justify-center items-center
    '>
    
    <PuffLoader 
        size={100}
        color='#A855F7'
    />

    </div>
    )
}

export default Loader
