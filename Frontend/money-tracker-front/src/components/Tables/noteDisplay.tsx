import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Note } from "../../models/note";
import FormNote from "../Forms/FormNote";

const NotesDisplay: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3004/note/getData", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        data.sort(
          (a: Note, b: Note) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNotes(data);
        console.log("Notes fetched:", data);
      } else {
        console.error("Error fetching notes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  async function deleteNote(noteId: string) {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3004/note/deleteData/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Nota eliminada exitosamente");
      } else {
        console.error("Error al eliminar la nota");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleClose = () => {
    setSelectedNote(null); // Cierra el modal
  };

  const editNote = (noteId: string) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    if (noteToEdit) {
      setSelectedNote(noteToEdit);
    }
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="task-card content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full"
        >
          <div className="flex justify-between font-bold text-sm">
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                note.status === "Completada"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {note.status}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(note.date).toLocaleDateString("es-ES")}
            </p>
          </div>
          <h3 className="text-3xl font-semibold mt-4 md:mt-10">{note.title}</h3>
          <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">
            {note.content}
          </p>
          <button onClick={() => deleteNote(note.id)}>Eliminar Nota</button>
          <button onClick={() => editNote(note.id)}>Editar Nota</button>
        </div>
      ))}
      {selectedNote && (
        <FormNote note={selectedNote} formType={"edit"} onClose={handleClose} />
      )}
    </div>
  );
};

export default NotesDisplay;
