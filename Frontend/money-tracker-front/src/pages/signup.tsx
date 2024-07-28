import React, { useState } from 'react'
import Link from 'next/link'

const Signup = () => {
  // Estados para los datos del formulario
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    setErrorMessage('');

    const userData = {
      name,
      lastname,
      email,
      password,
    };

    try {
      // Enviar la solicitud POST
      const response = await fetch('http://localhost:3000/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Verificar la respuesta
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSuccessMessage('Cuenta creada exitosamente.');
        setName('');
        setLastname('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al crear la cuenta.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error al conectarse con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Crea tu Cuenta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Nombre
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  placeholder="Ingrese su Nombre"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Apellido
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="lastname"
                  name="lastname"
                  placeholder="Ingrese su Apellido"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Correo Electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  placeholder="usuario@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Contraseña
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  placeholder="Mínimo 6 caracteres"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Confirme su Contraseña
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="Reingrese su contraseña"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
            )}

            {successMessage && (
              <div className="mt-4 text-green-500 text-sm">{successMessage}</div>
            )}

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Crear Cuenta
                </button>
              </span>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/">
              <p className="text-blue-500 hover:text-blue-700">
                Volver a la página de inicio
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
