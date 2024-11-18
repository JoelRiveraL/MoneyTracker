import { Module } from '@nestjs/common';
import { NoteService } from './note/note.service';
import { NoteController } from './note/note.controller';
import { Nota } from './note/entities/note.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      entities: [Nota],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Nota]),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class AppModule {}
