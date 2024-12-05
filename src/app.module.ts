import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { FarmsModule } from './farms/farms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentModule } from './environment/environment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI,
    ),
    FarmsModule,
    EnvironmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
