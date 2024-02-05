import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import Loader from '../components/Loader';

const ForgetPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const validateUser = yup.object({
        email: yup.string().email("Please enter a valid email").required("Email is required"),
        password: yup.string().required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            )
    })

    const forgetPass = async (values: any) => {
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/forget`, values);
            alert("password updated successfully")
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
                        <h1 className='text-center font-semibold capitalize text-2xl mb-3'> Update Password!</h1>
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validateUser}
                            onSubmit={(values) => forgetPass(values)}
                        >
                            {() => (
                                <Form>
                                    <div className=''>
                                        <InputField type='text' label='email' name='email' placeholder='Enter your email' />
                                        <InputField type='password' label='password' name='password' placeholder='Enter your password' />
                                    </div>
                                    <button type='submit' className='btn bg-violet-600 text-white mt-4'>Update</button>
                                    <button type='reset' className='btn bg-red-600 text-white mt-4'>Reset</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
            }
        </>
    )
}

export default ForgetPassword
