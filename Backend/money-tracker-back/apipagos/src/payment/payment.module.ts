import { Module } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { PaymentController } from './controller/payment.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PaymentGuard } from './guard/payment.guard';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Asegúrate de que esta clave esté en tu archivo .env
      signOptions: { expiresIn: '5m' }, // Ajusta el tiempo de expiración según lo necesites
    }),
  ],
  providers: [PaymentService, PaymentGuard], // Asegúrate de que PaymentGuard esté en providers
  controllers: [PaymentController],
})
export class PaymentModule {}
