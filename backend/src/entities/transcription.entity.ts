import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ default: 'in_progress' })
  status: 'in_progress' | 'completed';

  @Column({ type: 'text', nullable: true })
  transcriptionData: string;

  @Column({ nullable: true })
  duration: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 