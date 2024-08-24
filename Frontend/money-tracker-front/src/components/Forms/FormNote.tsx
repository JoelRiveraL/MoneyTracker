import React, { useState } from "react";
import Cookies from "js-cookie";
import SelectStatusNote from "../FormElements/SelectStatusNotes";

const FormNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
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

    try {
      const response = await fetch("http://localhost:3004/note/createData", {
        method: "POST",
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
        setMessage("Nota creada con éxito");
        setMessageType("success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error al crear la nota:", response.statusText);
        setMessage("Error al crear la nota");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error al crear la nota:", error);
      setMessage("Error al crear la nota");
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
      <form onSubmit={handleSubmit}>
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
                  onChange={(selectedValue) =>
                    console.log("Estado seleccionado:", selectedValue)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4.5 p-6.5">
          <button
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="button"
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
  );
};

export default FormNote;
