import { ErrorMessage, useField } from "formik";
import React from "react";

interface InputFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    type: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    return (
        <>
            <div className='my-2'>
                <label
                    htmlFor={field.name}
                    className='capitalize font-medium pb-3 ms-2'
                >
                    {label}
                </label>
                <input
                    {...field}
                    {...props}
                    className={`px-3 py-2 bg-gray-100 text-gray-700 border border-black/10 outline-none rounded-lg focus:border-blue-500 w-full ${meta.touched && meta.error && "border border-red-500"}`}
                />
                <ErrorMessage component={'div'} name={field.name} className="text-red-600 text-[12px] sm:text-sm" />
            </div>
        </>
    )
}
export default InputField