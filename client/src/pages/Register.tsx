import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { Formik, Form } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import Loader from '../components/Loader';
import { SignUpTypes } from '../types';

const Register: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const validateUser = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Please enter a valid email").required("Email is required"),
        password: yup.string().required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
    })

    const userRegister = async (values: SignUpTypes) => {
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/register`, values);
            alert("register successfully");
            navigate('/login');
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
                    <div className='w-[20rem] xs:w-[25rem] sm:w-[30rem] mx-auto bg-white rounded-lg h-auto p-4 sm:p-8 shadow-lg'>
                        <h1 className='text-center font-semibold capitalize text-2xl mb-3'> Create your account</h1>
                        <Formik
                            initialValues={{ name: "", email: "", password: "" }}
                            validationSchema={validateUser}
                            onSubmit={(values) => userRegister(values)}
                        >
                            {() => (
                                <Form>
                                    <div className=''>
                                        <InputField type='text' label='full name' name='name' placeholder='Enter your name' />
                                        <InputField type='text' label='email' name='email' placeholder='Enter your email' />
                                        <InputField type='password' label='password' name='password' placeholder='Enter your password' />
                                        <Link to={'/'} className='font-medium text-sm text-gray-600'>Already have a account? <span className='text-blue-500 hover:underline'>login here</span></Link>
                                    </div>
                                    <button type='submit' className='btn bg-violet-600 text-white mt-4'>Register</button>
                                    <button type='reset' className='btn bg-red-600 text-white mt-4'>Reset</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
            }
        </>
    )
}

export default Register