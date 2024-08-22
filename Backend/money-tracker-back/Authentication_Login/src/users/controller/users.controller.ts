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

  @Post('createUser')
  async createUser(@Body() userData: any): Promise<{ message: string }> {
    await this.usersService.createUser(userData);
    return { message: 'Usuario creado exitosamente' };
  }

  @Get('getUsers')
  @UseGuards(AuthGuard)  // Protege esta ruta con el guard de JWT
  async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }

  @Post('login')
  async login(@Body() userData: any): Promise<any> {
    const user = await this.authService.login(     ///    async login({email, password}: any) //.login en vez de . validateUser
      userData
    );    

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    console.log('User:', this.authService.login(user));
    return this.authService.login(user);
  }  
}
