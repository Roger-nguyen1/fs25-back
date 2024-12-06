import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
import { DayTime, DayTimeSchema } from './environment-day-time.schema';
import { EnvironmentTask } from './environment.task';
import { Log, LogSchema } from '../log/log.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: DayTime.name, schema: DayTimeSchema }]),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  providers: [EnvironmentService, EnvironmentTask],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
