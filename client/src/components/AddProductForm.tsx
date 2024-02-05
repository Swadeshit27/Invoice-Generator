import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import InputField from './InputField'
import { useAppDispatch } from '../redux/store';
import * as yup from "yup"
import { addProducts } from '../redux';
import { Product } from '../types';
import { v4 } from "uuid";


const AddProductForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const initialValues = { name: "", qty: 0, price: 0, id: v4() }

    const validate = yup.object({
        name: yup.string().required("Product Name is required"),
        qty: yup.number().moreThan(0, "quantity can't be zero or negative").lessThan(10, "quantity is at max 10").required("Quantity is required"),
        price: yup.number().moreThan(0, "price can't be zero or negative").required("Product's rate is required"),
    })

    const handelSubmit = (values: Product, { resetForm }: FormikHelpers<Product>) => {
        dispatch(addProducts(values))
        resetForm();
    }

    return (
        <>
            <div>
                <h1 className='mb-6 text-2xl font-semibold text-black capitalize text-center'>add products</h1>
                <div className='lg:mx-8'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validate}
                        onSubmit={handelSubmit}
                    >
                        {() => (
                            <Form>
                                <div className='grid grid-cols-2 md:grid-cols-4 gap-x-6'>
                                    <InputField type='text' name='name' label='product Name' placeholder='Enter product name' />
                                    <InputField type='number' name='qty' label='Quantity' placeholder="Enter product's quantity" />
                                    <InputField type='number' name='price' label='Rate' placeholder="Enter product's price" />
                                    <button type='submit' className='mt-8 w-36 h-10 font-semibold rounded-md text-white bg-blue_primary'>Add Product</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default AddProductForm
