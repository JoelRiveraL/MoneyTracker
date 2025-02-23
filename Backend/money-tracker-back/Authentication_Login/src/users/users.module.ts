import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { AuthModule } from '../auth/auth.module';  // Importamos AuthModule con forwardRef

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)],  // Usamos forwardRef para evitar el ciclo de dependencias
})
export class UsersModule {}
