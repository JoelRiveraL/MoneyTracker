import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service'; // Asegúrate de que el servicio esté correcto

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Registrar usuario
  async register({ name, lastname, email, password }: any) {
    if (!name || !lastname || !email || !password) {
      throw new BadRequestException('All fields are required');
    }

    const user = await this.usersService.getUserValidation(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Crear el nuevo usuario en la base de datos
    const newUser = await this.usersService.createUser({
      nombreU: name,
      apellidoU: lastname,
      correoU: email,
      passwordU: hashedPassword,
    });

    return { message: 'User created successfully', user: newUser };
  }


  // Login de usuario
  async login({ email, password }: any) {
    const user = await this.usersService.getUserValidation(email);

    if (!user) {
      throw new UnauthorizedException('Email is incorrect');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordU); // Comparación de contraseñas

    if (!passwordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const payload = {
      email: user.correoU,  // Asegúrate de que los campos coincidan con la base de datos
      name: user.nombreU,
      lastname: user.apellidoU,
      sub: user.idUsuario,  // O el campo que identifique de forma única al usuario
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user,
    };
  }

  // Validación de token
  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
