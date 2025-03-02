import { Controller, Post, Body, UseGuards, Get, UnauthorizedException, Put, Delete, Param } from '@nestjs/common';
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
  
    return this.authService.login(userData);
  } 
  
  @Put('updateUser/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() userData: any): Promise<{ message: string }> {
    await this.usersService.updateUser(id, userData);
    return { message: 'Usuario actualizado exitosamente' };
  }
  
  @Delete('deleteUser/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.deleteUser(id);
    return { message: 'Usuario eliminado exitosamente' };
  }
  
}
