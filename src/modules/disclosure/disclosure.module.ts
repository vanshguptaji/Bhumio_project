import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disclosure } from '../../database/entities/disclosure.entity';
import { DisclosureRepository } from '../../database/repositories/disclosure.repository';
import { DisclosureService } from './disclosure.service';
import { DisclosureController } from './disclosure.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Disclosure])],
  providers: [
    {
      provide: DisclosureRepository,
      useValue: null, // Will be provided by DatabaseModule
    },
    DisclosureService,
  ],
  controllers: [DisclosureController],
  exports: [DisclosureService],
})
export class DisclosureModule {}
