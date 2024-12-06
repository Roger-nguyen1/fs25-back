import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmsService } from './farms.service';
import { Farm, FarmSchema } from './farm.schema';
import { FarmsTask } from './farms.task';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farm.name, schema: FarmSchema }]),
  ],
  providers: [FarmsService, FarmsTask],
})
export class FarmsModule {}
