import { Module } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { PaymentController } from './controller/payment.controller';
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
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
