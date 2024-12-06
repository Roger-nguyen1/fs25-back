import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmsService } from './farms.service';
import { Farm, FarmSchema } from './farm.schema';
import { FarmsTask } from './farms.task';
import { Log, LogSchema } from '../log/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farm.name, schema: FarmSchema }]),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  providers: [FarmsService, FarmsTask],
})
export class FarmsModule {}
