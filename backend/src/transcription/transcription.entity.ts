import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Transcription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @Column({ nullable: true })
  comparisonFileName: string;

  @Column({ nullable: true })
  comparisonFilePath: string;

  @Column({ default: 'single' })
  type: 'single' | 'comparison';

  @Column({ nullable: true })
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 