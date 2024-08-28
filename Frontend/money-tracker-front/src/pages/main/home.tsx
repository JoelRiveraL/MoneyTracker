import React, { useState } from 'react';
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import TableThree from "../../components/Tables/TableDebts";
import FormIncome from "../../components/Forms/FormIncome";
import TableGeneral from "../../components/Tables/TableGeneral";

export default function Home() {
    const paymentLimit = 3;
    const [filter, setFilter] = useState({ name: '', });
  return (
    <div>
      <DefaultLayout>
        <FormIncome />
        
        <div className="flex flex-col gap-10">
        <TableGeneral limit={paymentLimit}  filter={filter}/>
        </div>
      </DefaultLayout>
    </div>
  );
}
