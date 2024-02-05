import { Button, Spinner } from 'flowbite-react'
import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className='w-full my-[10rem] flex justify-center items-center'>
            <Button className='bg-purple-600'>
                <Spinner aria-label="spinner button example" color={"success"}  size="lg" />
                <span className="pl-3">Loading...</span>
            </Button>
        </div>
    )
}

export default Loader
