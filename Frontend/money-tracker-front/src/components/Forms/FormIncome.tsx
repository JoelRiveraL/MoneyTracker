import React from 'react'
import MultiSelect from '../FormElements/MultiSelect'

const FormIncome = () => {
  return (
    <div>
        <form action="#">
          <div className="flex flex-col gap-5.5 p-6.5  grid grid-cols-1 gap-9 sm:grid-cols-2">
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
                    placeholder="De un nombre descriptivo a su su ingreso/egreso"
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
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  />
                </div>
                <div >
                    <MultiSelect id="multiSelect" />
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
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
  )
}

export default FormIncome