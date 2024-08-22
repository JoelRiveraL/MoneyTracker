import React, { useState } from 'react';
import Cookies from 'js-cookie';
import MultiSelect from '../FormElements/MultiSelect';
import SelectStatus from '../FormElements/SelectStatus';

const FormIncome = () => {
  const [name, setName] = useState('');
  const [price, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [type, setTypes] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success'); // Estado para el tipo de mensaje

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = Cookies.get('token');
    const date = new Date().toISOString();

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/payment/createData', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          description,
          status,
          type,
          date
        }),
      });

      if (response.ok) {
        setMessage('Datos enviados con éxito');
        setMessageType('success'); // Establecer tipo de mensaje a éxito
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error('Error sending data:', response.statusText);
        setMessage('Error al enviar los datos');
        setMessageType('error'); // Establecer tipo de mensaje a error
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setMessage('Error al enviar los datos');
      setMessageType('error'); // Establecer tipo de mensaje a error
    }
  };

  return (
    <div>
      {message && (
        <div className={`alert ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5.5 p-6.5 grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Campos de Ingreso 
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="De un nombre descriptivo a su ingreso/egreso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Monto
                </label>
                <input
                  type="number"
                  placeholder="Ingrese su monto en números"
                  value={price}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>
              <div></div>
              <div>
                <MultiSelect
                  id="multiSelect"
                  onChange={(selectedValues) => setTypes(selectedValues)}
                />
              </div>
            </div>
          </div>

          {/* Textarea Fields */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Campo de Descripción 
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Descripción
                </label>
                <textarea
                  rows={6}
                  placeholder="Ingrese una Descripción para controlar sus acciones financieras"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              <div>
                <SelectStatus
                  id="selectStatus"
                  onChange={(selectedStatus) => setStatus(selectedStatus)}
                />
              </div>
              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormIncome;
