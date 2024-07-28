import React from 'react'
import Link from 'next/link'

const index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Ingresa a tu Cuenta
            </h2>
            <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                <Link href="/signup"
                    className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Crea una nueva Cuenta
                </Link>
            </p>
        </div>


        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form>
                    <div>
                        <label form="email" className="block text-sm font-medium leading-5  text-gray-700">Correo Electrónico</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="email" name="email" placeholder="usuario@example.com" type="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label form="password" className="block text-sm font-medium leading-5 text-gray-700">Contraseña</label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <input id="password" name="password" placeholder='Ingrese su contraseña' type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember" type="checkbox" value="1" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                            <label form="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Recuérdame</label>
                        </div>

                        <div className="text-sm leading-5">
                            <a href="#"
                                className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                ¿Olvidaste tu Contraseña?
                            </a>
                        </div>
                    </div>

                    <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                            <Link href={"/home"}>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                Iniciar Sesión
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

export default index

