import React, { useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import NotesDisplay from "../../components/Tables/noteDisplay";
import FormNote from "../../components/Forms/FormNote";

const Notes = () => {
  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <br />
        <h1>Notas</h1>
        <br />

        {/* Botón para agregar una nueva nota */}
        <button
          className="rounded bg-primary px-4 py-2 text-white"
          onClick={handleOpen}
        >
          +
        </button>

        {/* Renderiza el formulario solo si el modal está abierto */}
        {isModalOpen && (
          <FormNote
            formType={"create"}
            note={undefined}
            onClose={handleClose}
          />
        )}

        <NotesDisplay />
      </div>
    </DefaultLayout>
  );
};

export default Notes;
