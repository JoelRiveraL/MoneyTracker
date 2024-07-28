import React, { useState } from 'react';
import Link from 'next/link';

const Index: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess('Autenticación exitosa');
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/home';
      } else {
        setError(data.message || 'Error en la autenticación');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setError('Error datos incorrectos.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Ingresa a tu Cuenta
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
          <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            Crea una nueva Cuenta
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Correo Electrónico</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input id="email" name="email" type="email" required placeholder="usuario@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Contraseña</label>
              <div className="mt-1 rounded-md shadow-sm">
                <input id="password" name="password" type="password" required placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
              </div>
            </div>

            {error && (
              <div className="mt-4 text-red-500">{error}</div>
            )}

            {success && (
              <div className="mt-4 text-green-500">{success}</div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember" type="checkbox" value="1" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Recuérdame</label>
              </div>

              <div className="text-sm leading-5">
                <a href="#" className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">¿Olvidaste tu Contraseña?</a>
              </div>
            </div>

            <div className="mt-6">
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
