import React, { useState } from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableDebts from '../../components/Tables/TableDebts';
import FormFilter from '../../components/Forms/FormFilterDebt';

const Debts = () => {
  const [filter, setFilter] = useState({ name: ''});

  const handleFilterChange = (newFilter: { name: string}) => {
    setFilter(newFilter);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Deudas" />
        <FormFilter onFilterChange={handleFilterChange} />
        <br />
        <TableDebts filter={filter} />
      </div>
    </DefaultLayout>
  );
};

export default Debts;
