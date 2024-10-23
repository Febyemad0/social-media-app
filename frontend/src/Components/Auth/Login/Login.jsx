import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../../Context/UserContext";

let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[$@!%*?&]/, "Password must contain at least one special character")
        .required("Required"),
});

export default function Login() {
    let navigate = useNavigate();
    const [error, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId } = useContext(UserContext);

    async function loginSubmit(values) {
        setIsLoading(true);
        setIsError(null);

        try {
            let { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, values);
            navigate("/home");
            if (data.message === "user logged in") {
                localStorage.setItem('userId', data.userId);
                navigate("/home");
            } else {
                setIsError(data.message || "Login failed");
            }
        } catch (err) {
            setIsError(err.response ? err.response.data.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }



    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: loginSubmit,
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark-bg">
                    Welcome back,
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#3b0764]">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                {...formik.getFieldProps("email")}
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-[#b91c1c] text-sm">{formik.errors.email}</div>
                            )}
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
                                {...formik.getFieldProps("password")}
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-[#b91c1c] text-sm">{formik.errors.password}</div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex w-full justify-center rounded-md px-3 py-1.5 tracking-wider text-md font-bold leading-7 shadow-md 
            ${isLoading ? "bg-dark-bg hover:bg-text-dark" : "bg-dark-bg hover:bg-text-dark"} 
            text-hover-color hover:text-text-light ease-in duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </form>
                {error && <div className="text-[#b91c1c] text-sm mt-2">{error}</div>}
            </div>
        </div>
    );
}
