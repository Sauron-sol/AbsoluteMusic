import { IsString, IsOptional } from 'class-validator';

export class CreateTranscriptionDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
} 