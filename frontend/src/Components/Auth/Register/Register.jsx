import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[$@!%*?&]/, 'Password must contain at least one special character')
        .required('Required'),
});

export default function Register() {
    const navigate = useNavigate();
    const [error, setIsError] = useState(null);

    async function registerSubmit(values) {
        console.log(values);

        try {
            let { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, values);
            console.log(data);
            if (data.message === 'User registered successfully') {
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                setIsError(error.response.data.message);
            } else {
                setIsError("An unexpected error occurred");
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: registerSubmit
    });

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark-bg">
                        Welcome, Let's create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-[#3b0764]">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-dark-bg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div className="text-[#b91c1c] text-sm">{formik.errors.username}</div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#3b0764]">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-[#b91c1c] text-sm">{formik.errors.email}</div>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#3b0764]">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-[#b91c1c] text-sm">{formik.errors.password}</div>
                                ) : null}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md px-3 py-1.5 tracking-wider text-md font-bold leading-7 shadow-md bg-dark-bg hover:bg-text-dark text-hover-color hover:text-text-light ease-in duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    {error && <div className="text-[#b91c1c] text-sm mt-2">{error}</div>}
                </div>
            </div>
        </>
    );
}