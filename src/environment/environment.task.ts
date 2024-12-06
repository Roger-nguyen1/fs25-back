import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EnvironmentService } from './environment.service';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from '../log/log.schema';
import { Model } from 'mongoose';
import * as moment from 'moment-timezone';

const updatedAt = moment().tz('Europe/Paris').format();

@Injectable()
export class EnvironmentTask {
  constructor(
    private readonly environmentService: EnvironmentService,
    @InjectModel(Log.name) private readonly logModel: Model<Log>,
  ) {}

  // Scheduled task to run at specified intervals
  @Cron('0 0 9-23,4 * * *')
  async handleCron() {
    await this.executeTask();
  }

  // Method to execute the task manually or by the scheduler
  async executeTask() {
    try {
      await this.environmentService.loadEnvironmentData();
      console.log(
        'Environment data successfully loaded and saved to the database.',
      );
      await this.logInfo(
        'Environment data successfully loaded and saved to the database.',
      );
    } catch (error) {
      console.error('Error processing environment data:', error.message);
      await this.logError(
        `Error processing environment data: ${error.message}`,
      );
    }
  }

  private async logInfo(message: string) {
    const log = new this.logModel({
      message,
      level: 'info',
      updatedAt: updatedAt,
    });
    await log.save();
  }

  private async logError(message: string) {
    const log = new this.logModel({
      message,
      level: 'error',
      updatedAt: updatedAt,
    });
    await log.save();
  }
}
