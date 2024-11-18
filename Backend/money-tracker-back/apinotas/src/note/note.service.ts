import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Nota)
    private noteRepository: Repository<Nota>,  // Inyectamos el repositorio de TypeORM para la entidad Nota
  ) {}

  // Crear una nueva nota
  async createNote(data: any): Promise<void> {
    const note = this.noteRepository.create(data);  // Creamos una nueva instancia de Nota
    await this.noteRepository.save(note);  // Guardamos la nota en la base de datos
  }

  // Obtener todas las notas de un usuario
  async getNotes(userId: string): Promise<any[]> {
    return await this.noteRepository.find({ where: { idUsuario: Number(userId) } });
  }

  // Obtener una nota específica por su id
  async getNoteById(userId: string, noteId: string): Promise<any> {
    // Buscamos la nota con el 'id' y 'idUsuario' correspondientes
    const note = await this.noteRepository.findOne({ where: { id: Number(noteId), idUsuario: Number(userId) } });
    if (!note) {
      throw new Error('Note not found.');
    }
    return note;
  }

  // Actualizar una nota existente
  async updateNote(data: any, noteId: string): Promise<void> {
    const note = await this.noteRepository.findOne({ where: { id: Number(noteId), idUsuario: data.idUsuario } });
    if (note) {
      // Actualizamos la nota con los nuevos datos
      await this.noteRepository.save({ ...note, ...data });
    } else {
      throw new Error('Note not found.');
    }
  }

  // Eliminar una nota
  async deleteNote(data: any, noteId: string): Promise<void> {
    const note = await this.noteRepository.findOne({ where: { id: Number(noteId), idUsuario: data.idUsuario } });
    if (note) {
      // Eliminamos la nota de la base de datos
      await this.noteRepository.remove(note);
    } else {
      throw new Error('Note not found.');
    }
  }
}
