import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranscriptionModule } from './transcription/transcription.module';
import { Transcription } from './transcription/transcription.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Transcription],
      synchronize: true,
    }),
    TranscriptionModule,
  ],
})
export class AppModule {}
