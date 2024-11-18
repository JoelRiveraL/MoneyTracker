import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // Registra la entidad Usuario
  providers: [UsersService],
  exports: [UsersService], // Exporta el servicio para usarlo en otros módulos
})
export class UsersModule {}
