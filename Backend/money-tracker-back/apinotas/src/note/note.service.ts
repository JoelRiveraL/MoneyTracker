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
    const userNotes = Object.values(notes).filter(
      (note: any) => note.userId === userId,
    );
    return userNotes;
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


  async updateNote(data: any,noteId: string): Promise<void> {
    const noteRef = ref(firebaseDataBase, `Note/${noteId}`);
    const snapshot: DataSnapshot = await get(noteRef);
    const note = snapshot.val();

    if (note && note.userId === data.userId) {
      await set(noteRef, { ...note, ...data });
    } else {
      throw new Error('Note not found.');
    }
  }

    async deleteNote(data: any,noteId): Promise<void> {
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
