import { Controller, Post, Body, UseGuards, Get, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // Crear un usuario
  @Post('createUser')
  async createUser(@Body() userData: any): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await this.usersService.createUser({ ...userData, password: hashedPassword });
    return { message: 'Usuario creado exitosamente' };
  }

  // Obtener todos los usuarios
  @Get('getUsers')
  @UseGuards(AuthGuard) // Ruta protegida con JWT
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }

  // Login
  @Post('login')
  async login(@Body() userData: any): Promise<any> {
    const user = await this.authService.login(userData);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }
}
