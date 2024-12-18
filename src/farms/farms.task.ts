import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FarmsService } from './farms.service';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from '../log/log.schema';
import { Model } from 'mongoose';
import * as moment from 'moment-timezone';

const updatedAt = moment().tz('Europe/Paris').format();

//Pour tester et exécuter une fois la task
@Injectable()
export class FarmsTask {
  constructor(
    private readonly farmsService: FarmsService,
    @InjectModel(Log.name) private readonly logModel: Model<Log>,
  ) {}

  // Tâche planifiée
  @Cron('0 0 9-23,4 * * *') //('0 0 9-23,4 * * *') // Cron habituel // ('45 * * * * *') Test toutes les 45sec
  async handleCron() {
    await this.executeTask();
  }

  // Méthode manuelle
  async executeTask() {
    const filePath = '../savegame1/farms.xml'; // Chemin vers le fichier XML
    console.log('filePath : ', filePath);
    try {
      const data = await this.farmsService.parseXmlFile(filePath);
      await this.farmsService.saveFarmsToDb(data);
      console.log('Farms data successfully saved to the database.');
      await this.logInfo('Farms data successfully saved to the database.');
    } catch (error) {
      console.error('Error processing XML file:', error.message);
      await this.logError(`Error processing farm data : ${error.message}`);
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
