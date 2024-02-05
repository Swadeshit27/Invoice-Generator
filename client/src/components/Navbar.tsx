import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { logOutUser } from '../redux';

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(store => store.products);

    return (
        <div className='w-full h-20 bg-white shadow-lg flex items-center justify-between px-4 sm:px-8 md:px-12 fixed top-0 z-50'>
            <Link to='/' className='text-xl font-semibold cursor-pointer text-gray-900'>Invoice Generator</Link>
            {
                !token ?
                    <div className='flex items-center'>
                        <Link to='/login' className='btn bg-blue-600 text-white max-sm:me-0'>Log in</Link>
                        <Link to={'/register'} className='max-sm:hidden btn me-0 border-2 border-blue-600 '>Sign up</Link>
                    </div> :
                    <div className='flex items-center'>
                        <Link to='/login' className='btn bg-red-500 text-white' onClick={() => dispatch(logOutUser())}>Log out</Link>
                    </div>
            }
        </div>
    )
}

export default Navbar
