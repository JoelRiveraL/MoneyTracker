import React, { useState, useEffect } from 'react'
import flatpickr from "flatpickr";
import DatePickerTwo from '../utils/DatePickerTwo';
import Link from 'next/link'

const FormFilter = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  
    const changeTextColor = () => {
      setIsOptionSelected(true);
    };

    useEffect(() => {
        // Init flatpickr
        flatpickr(".form-datepicker", {
          mode: "single",
          static: true,
          monthSelectorType: "static",
          dateFormat: "M j, Y",
          prevArrow:
            '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
          nextArrow:
            '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        });
      }, []);

  return (
    <div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
            <div className="flex flex-col gap-5.5 p-6.5  grid grid-cols-1 gap-9 sm:grid-cols-4">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Buscar Deuda
                </label>
                <input
                  type="text"
                  placeholder="Nombre de la Deuda"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                
              </div>
              <div>
                <div className="flex flex-wrap gap-5 xl:gap-20 pt-7">
                    <Link
                        href="#"
                        className="inline-flex items-center justify-center rounded-md bg-meta-3 px-9 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                        Buscar
                    </Link>
                </div>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Está Completada?
                </label>
                <label
                    htmlFor="checkboxLabelFour"
                    className="flex cursor-pointer select-none items-center pt-3"
                >
                    <div className="relative">
                    <input
                        type="checkbox"
                        id="checkboxLabelFour"
                        className="sr-only"
                        onChange={() => {
                        setIsChecked(!isChecked);
                        }}
                    />
                    <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                        isChecked && "border-primary"
                        }`}
                    >
                        <span
                        className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                            isChecked && "!bg-primary"
                        }`}
                        >
                        {" "}
                        </span>
                    </div>
                    </div>
                    Realizada
                </label>
                </div>
                <div>
                <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Seleccione el Estado
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">

                    <select
                    value={selectedOption}
                    onChange={(e) => {
                        setSelectedOption(e.target.value);
                        changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        isOptionSelected ? "text-black dark:text-white" : ""
                    }`}
                    >
                    <option value="" disabled className="text-body dark:text-bodydark">
                        Seleccione Una
                    </option>
                    <option value="forPay" className="text-body dark:text-bodydark">
                        Por Pagar
                    </option>
                    <option value="forReceive" className="text-body dark:text-bodydark">
                        Por Cobrar
                    </option>
                    </select>

                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.8">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                        ></path>
                        </g>
                    </svg>
                    </span>
                </div>
              </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormFilter