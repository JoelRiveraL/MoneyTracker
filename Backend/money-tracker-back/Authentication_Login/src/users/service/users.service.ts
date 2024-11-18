import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // Crear usuario
  async createUser(data: Partial<Usuario>): Promise<Usuario> {
    const newUser = this.usuarioRepository.create(data);
    return this.usuarioRepository.save(newUser);
  }

  // Obtener todos los usuarios
  async getUsers(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  // Validar usuario por correo
  async getUserValidation(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { correoU: email } });
  }

  // Login basado en credenciales
  async login(userData: { email: string; password: string }): Promise<Usuario | null> {
    const user = await this.getUserValidation(userData.email);
    if (user && (await bcrypt.compare(userData.password, user.passwordU))) {
      return user;
    }
    return null;
  }
}
