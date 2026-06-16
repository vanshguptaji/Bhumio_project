import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { LoanDocument } from './loan-document.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  propertyId: string;

  @ManyToOne(() => Property, (property) => property.offers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column({ type: 'varchar', length: 255 })
  buyerName: string;

  @Column({ type: 'varchar', length: 255 })
  buyerEmail: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  offerPrice: number;

  @Column({ type: 'integer' })
  closingDays: number;

  @Column({ type: 'boolean', default: false })
  inspectionContingency: boolean;

  @Column({ type: 'boolean', default: false })
  financingContingency: boolean;

  @Column({ type: 'boolean', default: false })
  appraisalContingency: boolean;

  @Column({ type: 'text', nullable: true })
  additionalConditions: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  strengthScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  closingProbability: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  riskLevel: string;

  @Column({ type: 'text', nullable: true })
  explanation: string;

  @Column({ type: 'json', nullable: true })
  extractedData: Record<string, any>;

  @OneToMany(() => LoanDocument, (loan) => loan.offer, {
    cascade: true,
    lazy: true,
  })
  loanDocuments: LoanDocument[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
