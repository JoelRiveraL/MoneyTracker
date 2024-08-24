import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { JwtModule } from '@nestjs/jwt';
//import { jwtConstants } from './constants/jwt.constant'; // Import the jwtConstants
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno
    JwtModule.register({
      global: true,
     secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
