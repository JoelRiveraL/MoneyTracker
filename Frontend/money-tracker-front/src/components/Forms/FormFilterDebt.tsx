import React, { useState, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; 
import Link from 'next/link';

interface FormFilterProps {
  onFilterChange: (filter: { name: string}) => void;
}

const FormFilter: React.FC<FormFilterProps> = ({ onFilterChange }) => {
  const [name, setName] = useState('');

  useEffect(() => {
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

  const handleFilterChange = () => {
    onFilterChange({
      name
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-col gap-5.5 p-6.5 grid grid-cols-1 gap-9 sm:grid-cols-4">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Buscar Deuda
          </label>
          <input
            type="text"
            placeholder="Nombre de la Deuda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-5 xl:gap-20 pt-7">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-meta-3 px-9 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={(e) => {
                e.preventDefault();
                handleFilterChange();
              }}
            >
              Buscar
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FormFilter;
