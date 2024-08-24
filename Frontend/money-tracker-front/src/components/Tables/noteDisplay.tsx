
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Note } from "../../models/note";

const NotesDisplay: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  
  const fetchNotes = async () => {
    const token = Cookies.get('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:3004/note/getData', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        data.sort((a: Note, b: Note) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setNotes(data);
      } else {
        console.error('Error fetching notes:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note, key) => (
        <div
          key={key}
          className="task-card content bg-white p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute"
        >
          <div className="flex justify-between font-bold text-sm">
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                note.status === 'Completada'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {note.status}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(note.date).toLocaleDateString('es-ES')}
            </p>
          </div>
          <h3 className="text-3xl font-semibold mt-4 md:mt-10">{note.title}</h3>
          <p className="my-3 text-justify font-medium text-gray-700 leading-relaxed">
            {note.content}
          </p>
        </div>
      ))}
    </div>
  );
  
}

export default NotesDisplay;
