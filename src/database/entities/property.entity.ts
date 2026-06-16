import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Disclosure } from './disclosure.entity';
import { Offer } from './offer.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  state: string;

  @Column({ type: 'varchar', length: 10 })
  zipCode: string;

  @OneToMany(() => Disclosure, (disclosure) => disclosure.property, {
    cascade: true,
    lazy: true,
  })
  disclosures: Disclosure[];

  @OneToMany(() => Offer, (offer) => offer.property, {
    cascade: true,
    lazy: true,
  })
  offers: Offer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
