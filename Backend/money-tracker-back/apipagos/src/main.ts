import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  app.enableCors(); // Esto habilita CORS si es necesario
  await app.listen(3000, '0.0.0.0'); // Asegúrate de escuchar en todas las interfaces
}
bootstrap();
