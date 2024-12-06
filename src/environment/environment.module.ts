import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}