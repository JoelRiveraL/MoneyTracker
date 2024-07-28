import React from 'react'
import Link from 'next/link'

const signup = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Create your account
            </h2>
        </div>


        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form>
                    <div>
                        <label form="name" className="block text-sm font-medium leading-5 text-gray-700">Name</label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <input id="name" name="name" placeholder="Name" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label form="lastname" className="block text-sm font-medium leading-5 text-gray-700">Lastname</label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <input id="lastname" name="lastname" placeholder="Lastname" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label form="email" className="block text-sm font-medium leading-5  text-gray-700">Email address</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="email" name="email" placeholder="user@example.com" type="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label form="password" className="block text-sm font-medium leading-5 text-gray-700">Password</label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <input id="password" name="password" type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label form="passwordConfirm" className="block text-sm font-medium leading-5 text-gray-700">Confirm Password</label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <input id="passwordConfirm" name="passwordConfirm" type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                            <Link href={"/"}>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                Sign up
                                </button>
                            </Link>
                        </span>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default signup