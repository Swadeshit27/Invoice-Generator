import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/InputField';
import { Formik, Form } from 'formik';
import * as yup from 'yup'
import { useAppDispatch } from '../redux/store';
import { addUserDetails } from '../redux';
import Loader from '../components/Loader';
import { userLoginType } from '../types';


const Login: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const validateUser = yup.object({
        email: yup.string().email("Please enter a valid email").required("Email is required"),
        password: yup.string().required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
    })

    const userLogin = async (values: userLoginType) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`, values);
            dispatch(addUserDetails(data.data))
            alert("login successful");
            navigate('/');
        } catch (error) {
            console.log(error);
            //@ts-ignore
            const errorData = error?.response?.data;
            alert(errorData)
            throw error
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading ? <Loader /> :
                    <div className='w-[21rem] xs:w-[24rem] sm:w-[30rem] mx-auto bg-white rounded-lg h-auto p-4 sm:p-8 shadow-lg'>
                        <h1 className='text-center font-semibold capitalize text-2xl mb-3'> Welcome Back!</h1>
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validateUser}
                            onSubmit={(values) => userLogin(values)}
                        >
                            {() => (
                                <Form>
                                    <div className=''>
                                        <InputField type='text' label='email' name='email' placeholder='Enter your email' />
                                        <InputField type='password' label='password' name='password' placeholder='Enter your password' />
                                        <Link to={'/forget'} className=' block text-blue-500 hover:underline font-medium cursor-pointer text-sm mb-2'>Forget password ?</Link>
                                        <Link to={'/register'} className='font-medium text-sm text-gray-600'>Don't have an account ? <span className='text-blue-500 hover:underline'>signup here</span></Link>
                                    </div>
                                    <button type='submit' className='btn bg-violet-600 text-white mt-4'>login</button>
                                    <button type='reset' className='btn bg-red-600 text-white mt-4'>Reset</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
            }
        </>
    )
}

export default Login