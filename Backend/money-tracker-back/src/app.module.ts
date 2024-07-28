import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PaymentModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
