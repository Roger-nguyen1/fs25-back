import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmsService } from './farms.service';
import { Farm, FarmSchema } from './farm.schema';
import { XmlTask } from './xmltojs.task';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farm.name, schema: FarmSchema }]),
  ],
  providers: [FarmsService, XmlTask],
})
export class FarmsModule {}
