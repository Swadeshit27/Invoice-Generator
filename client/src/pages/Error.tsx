import React from 'react'
import { Link } from 'react-router-dom'

const Error: React.FC = () => {
    return (
        <>
            <div className='pb-8 flex flex-col justify-center items-center'>
                <img src="404.svg" alt="about" className="img-fluid" width="500" />
                <h1 className='mb-4 text-2xl font-semibold text-center opacity-50'>Oops Page not found </h1>
                <Link className='px-8 font-semibold mx-auto rounded-md bg-purple-600 text-white py-2' to="/">Go back</Link>
            </div>
        </>
    )
}

export default Error