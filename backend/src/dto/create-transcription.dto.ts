import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTranscriptionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  description?: string;
} 