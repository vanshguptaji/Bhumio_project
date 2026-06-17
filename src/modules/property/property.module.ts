import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';

@Module({
  imports: [DatabaseModule],
  providers: [PropertyService],
  controllers: [PropertyController],
  exports: [PropertyService],
})
export class PropertyModule {}
