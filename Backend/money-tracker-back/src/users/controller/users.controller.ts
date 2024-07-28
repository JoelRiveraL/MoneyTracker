import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  async createUser(@Body() userData: any): Promise<{ message: string }> {
    await this.usersService.createPayment(userData);
    return { message: 'Usuario creado exitosamente' };
  }

  @Get('getUsers')
  async getUsers(): Promise<any> {
    return this.usersService.getPayments();
  }

  //Validar Login
    @Post('login')
    async login(@Body() userData: any): Promise<any> {
        return this.usersService.login(userData);
    }

}
