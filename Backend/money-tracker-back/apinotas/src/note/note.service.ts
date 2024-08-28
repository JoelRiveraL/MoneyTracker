import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get } from 'firebase/database';
import { firebaseDataBase } from 'src/firebaseConfig';

@Injectable()
export class NoteService {
  async createNote(data: any): Promise<void> {
    const dataRef = ref(firebaseDataBase, 'Note');
    const newElementRef = push(dataRef, { dataRef: data });
    await set(newElementRef, { ...data, userId: data.userId });
  }

  async getNotes(userId: string): Promise<any> {
    const dataRef = ref(firebaseDataBase, 'Note');
    const snapshot: DataSnapshot = await get(dataRef);
    const notes = snapshot.val();
    console.log(notes); // Muestra el objeto completo de notas

    // Filtrar notas por userId y mantener el ID de Firebase
    const notesArray = Object.keys(notes).reduce((acc: any[], id) => {
      const note = notes[id];
      if (note.userId === userId) {
        acc.push({ id, ...note }); // Agregar el ID junto con los datos de la nota
      }
      return acc;
    }, []);

    console.log(notesArray); // Muestra el array con los IDs y las notas
    return notesArray;
  }

  async getNoteById(userId: string, noteId: string): Promise<any> {
    const dataRef = ref(firebaseDataBase, `Note/${noteId}`);
    const snapshot: DataSnapshot = await get(dataRef);
    const note = snapshot.val();

    if (note && note.userId === userId) {
      return note;
    } else {
      throw new Error('Note not found.');
    }
  }

  async updateNote(data: any, noteId: string): Promise<void> {
    const noteRef = ref(firebaseDataBase, `Note/${noteId}`);
    const snapshot: DataSnapshot = await get(noteRef);
    const note = snapshot.val();

    if (note && note.userId === data.userId) {
      await set(noteRef, { ...note, ...data });
    } else {
      throw new Error('Note not found.');
    }
  }

  async deleteNote(data: any, noteId): Promise<void> {
    const noteRef = ref(firebaseDataBase, `Note/${noteId}`);
    const snapshot: DataSnapshot = await get(noteRef);
    const note = snapshot.val();

    if (note && note.userId === data.userId) {
      await set(noteRef, null);
    } else {
      throw new Error('Note not found.');
    }
  }
}
