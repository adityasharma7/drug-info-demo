import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('drug')
export class Drug {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'text' })
  genericName: string;

  @Column({ type: 'varchar', length: 200 })
  @Index()
  company: string;

  @Column({ type: 'varchar', length: 200 })
  brandName: string;

  @Column({ type: 'date' })
  launchDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

