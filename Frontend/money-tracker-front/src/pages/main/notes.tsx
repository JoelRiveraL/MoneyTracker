import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';

const Notes = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
            <div
                // Clave única si estás mapeando tareas
                // key={task.id}
                className="task-card content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute "
            >
                <div className="flex justify-between font-bold text-sm">
                <p>Estado: {/* task.status */}</p>
                <p className="text-gray-400">{/* task.date */}</p>
                </div>
                <h2 className="text-3xl font-semibold mt-4 md:mt-10">
                {/* task.name */}
                </h2>
                <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">
                {/* task.description */}
                </p>
            </div>
        </div>
    </DefaultLayout>
  );
}

export default Notes;
