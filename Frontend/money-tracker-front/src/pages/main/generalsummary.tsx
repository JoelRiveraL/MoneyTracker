import React, { useState } from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import FormFilter from '../../components/Forms/FormFilter';
import TableGeneral from '../../components/Tables/TableGeneral';

const GeneralSummary = () => {
  const paymentLimit = 0;
  const [filter, setFilter] = useState({ name: '', });

  const handleFilterChange = (newFilter: { name: string }) => {
    setFilter(newFilter);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <br />
        <h1>Ingresar Campos</h1>
        <br />
        <FormFilter onFilterChange={handleFilterChange} />
        <br />
        <h1>Resumen General</h1>
        <br />
        <TableGeneral limit={paymentLimit} filter={filter} />
      </div>
    </DefaultLayout>
  );
}

export default GeneralSummary;
