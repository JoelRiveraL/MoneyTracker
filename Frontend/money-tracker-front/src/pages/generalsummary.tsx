import React from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import TableThree from '../components/Tables/TableThree'
import FormFilter from '../components/Forms/FormFilter'

const generalsummary = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <br/>
        <h1>Ingresar Campos</h1>
        <br/>
        <FormFilter />
        <br/>
        <h1>Resumen General</h1>
        <br/>
        <TableThree />
      </div>
    </DefaultLayout>
  )
}

export default generalsummary