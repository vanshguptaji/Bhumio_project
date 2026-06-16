import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('disclosures')
export class Disclosure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  propertyId: string;

  @ManyToOne(() => Property, (property) => property.disclosures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column({ type: 'varchar', length: 500 })
  fileUrl: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  structuralRisk: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  legalRisk: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  financialRisk: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  environmentalRisk: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  overallRisk: number;

  @Column({ type: 'json', nullable: true })
  extractedData: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
