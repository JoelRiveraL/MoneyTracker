import React from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableThree from '../components/Tables/TableThree';
import FormFilterDebt from '../components/Forms/FormFilterDebt'

const Debts = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Deudas" />
        <FormFilterDebt />
        <br></br>
        <TableThree />


      </div>
    </DefaultLayout>
  );
}
export default Debts;
