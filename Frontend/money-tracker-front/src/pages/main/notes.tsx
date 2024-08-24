import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import NotesDisplay from '../../components/Tables/noteDisplay';
import FormNote from '../../components/Forms/FormNote';

const Notes = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <br />
        <h1>Notas</h1>
        <br />

        <FormNote />
      <NotesDisplay />

        </div>
    </DefaultLayout>
  );
}

export default Notes;
