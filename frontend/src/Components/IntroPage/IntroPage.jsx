import React from 'react'
import { Link } from 'react-router-dom'
import introPageImg from '../../assets/introPage.png'


export default function IntroPage() {
    return (
        <div className='h-screen grid md:grid-cols-2 grid-cols-1 gap-10'>
            <div className="flex justify-start items-center flex-col mx-4 ">
                <div className='mt-36 text-center'>
                    <h1 className='text-5xl text-dark-bg mb-5 font-bold'>Welcome To Daisy</h1>
                    <p className='text-sm mb-14 text-hover-color font-semibold'>Connect with friends, family, and the world.</p>
                    <img className='w-[450px]' src={introPageImg} alt="Intro" />
                </div>
            </div>
            <div className="flex justify-start items-center flex-col ">
                <div className='mt-36 text-center border-2 border-secondary bg-white md:p-16 p-10 rounded-3xl mb-14 md:mb-0 mx-4 '>
                    <h1 className='text-3xl text-dark-bg mb-20 font-bold'>Connect With Your People Now!</h1>
                    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center sm:items-stretch">
                        <Link to={"/register"}>
                            <button className="py-2 px-4 sm:py-3 sm:px-6 rounded-full bg-dark-bg hover:bg-text-dark text-hover-color hover:text-text-light ease-in duration-100 text-sm sm:text-base md:text-lg lg:text-xl">
                                I Am New Here
                            </button>
                        </Link>
                        <Link to={'/login'}>
                            <button className="py-2 px-4 sm:py-3 sm:px-6 rounded-full bg-dark-bg hover:bg-text-dark text-hover-color hover:text-text-light ease-in duration-100 text-sm sm:text-base md:text-lg lg:text-xl">
                                Log in
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

