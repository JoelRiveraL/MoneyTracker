import React, { useState } from "react";
import Cookies from "js-cookie";
import SelectStatusNote from "../FormElements/SelectStatusNotes";
import { Note } from "../../models/note";

interface FormNoteProps {
  formType: "create" | "edit";
  note?: Note | null;
  onClose: () => void;
}

const FormNote: React.FC<FormNoteProps> = ({ formType, note, onClose }) => {
  // Si note es undefined (en el caso de "create"), inicializa los estados como valores vacíos
  const [noteId, setNoteId] = useState(note?.id || "");
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [status, setStatus] = useState(note?.status || "pendiente"); // Por defecto "pendiente"
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = Cookies.get("token");
    const date = new Date().toISOString();

    if (!token) {
      console.error("No token found");
      return;
    }

    const endpoint =
      formType === "create"
        ? "http://localhost:3004/note/createData"
        : `http://localhost:3004/note/updateData/${noteId}`;

    const method = formType === "create" ? "POST" : "PUT";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          status,
          date,
        }),
      });

      if (response.ok) {
        setMessage(
          formType === "create"
            ? "Nota creada con éxito"
            : "Nota actualizada con éxito"
        );
        setMessageType("success");
        setTimeout(() => {
          onClose(); // Cierra el modal
        }, 2000);
      } else {
        console.error("Error:", response.statusText);
        setMessage("Error al procesar la nota");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMessage("Error al conectar con el servidor");
      setMessageType("error");
    }
  };

  return (
    <div>
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg p-6 shadow-lg dark:bg-boxdark">
          {/*Form tipo modal */}
          <form onSubmit={handleSubmit} typeof="modal">
            <div className="flex flex-col gap-5.5 p-6.5 grid grid-cols-1 gap-9 sm:grid-cols-2">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Campos de la Nota
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Título
                    </label>
                    <input
                      type="text"
                      placeholder="Ingrese el título de la nota"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Contenido
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Escriba el contenido de la nota"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Estado
                    </label>
                    <SelectStatusNote
                      id="status-note"
                      onChange={(selectedValue) => setStatus(selectedValue)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4.5 p-6.5">
              <button
                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="button"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormNote;
