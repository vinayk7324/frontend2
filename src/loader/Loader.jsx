import { Button, Spinner } from 'flowbite-react'
import React from 'react'

const Loader = ({
    visibility= false

}) => {
  return (
    <>
   <div className={`${visibility?'':'hidden'} z-20  h-full w-full flex items-center justify-center bg-[#131313] absolute top-0  `}>
    
    
   <div >
        <Button>
            <span>
                <Spinner/>
            </span>
            <span>loading...</span>
        </Button>
    </div>
   </div>

      
    </>
  )
}

export default Loader
