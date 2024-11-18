import { Body, Controller, Get, Post, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ruta de registro
  @Post('register')
  async register(@Body() userData: any) {
    return this.authService.register(userData);
  }

  // Ruta de login
  @Post('login')
  login(@Body() userData: any) {
    return this.authService.login(userData);
  }

  // Perfil protegido por JWT
  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Req() req: any) {
    return req.user;
  }

  // Validación de token
  @Post('validate')
  async validateToken(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1]; // Extraer token del header
    return this.authService.validateToken(token);
  }
}
