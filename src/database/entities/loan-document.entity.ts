import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Offer } from './offer.entity';

@Entity('loan_documents')
export class LoanDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  offerId: string;

  @ManyToOne(() => Offer, (offer) => offer.loanDocuments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @Column({ type: 'varchar', length: 255 })
  lenderName: string;

  @Column({ type: 'boolean', default: false })
  approved: boolean;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  loanAmount: number;

  @Column({ type: 'varchar', length: 100 })
  financingType: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  financingStrength: number;

  @Column({ type: 'json', nullable: true })
  extractedData: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
