import { Injectable } from '@nestjs/common';
import { parseString } from 'xml2js';
import { readFileSync } from 'fs';
import { promisify } from 'util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment-timezone';
import { DayTime } from './environment-day-time.schema';

@Injectable()
export class EnvironmentService {
  private environmentData: any;
  private dayTimeModel: Model<DayTime>;

  constructor(@InjectModel(DayTime.name) dayTimeModel: Model<DayTime>) {
    this.dayTimeModel = dayTimeModel;
    this.loadEnvironmentData();
  }

  private async loadEnvironmentData() {
    try {
      const filePath = '../savegame1/environment.xml'; // Remplacez par le chemin correct de votre fichier
      const xml = readFileSync(filePath, 'utf-8');
      this.environmentData = await this.parseXmlFile(xml);
      await this.saveDayTimeData();
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  private parseXmlFile(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  getEnvironmentData() {
    return this.environmentData;
  }

  private async saveDayTimeData() {
    const dayTimeDatas = this.getDayTime();
    const dayTimeDocument = new this.dayTimeModel(dayTimeDatas);
    await dayTimeDocument
      .save()
      .then(() => console.log('Day time data saved to database'))
      .catch((err) => console.error('Error saving day time data:', err));
  }

  getDayTime() {
    const updatedAt = moment().tz('Europe/Paris').format();
    const environment = this.environmentData.environment;
    const dayTimeDatas = {
      dayTime: environment.dayTime[0],
      currentDay: environment.currentDay[0],
      currentMonotonicDay: environment.currentMonotonicDay[0],
      realHourTimer: environment.realHourTimer[0],
      daysPerPeriod: environment.daysPerPeriod[0],
      lighting: environment.lighting,
      weather: {
        timeSinceLastRain: environment.weather[0]?.$.timeSinceLastRain[0],
      },
      updatedAt: updatedAt,
    };

    return dayTimeDatas;
  }

  getWeatherForecast() {
    return this.environmentData.environment.weather[0]?.forecast[0]?.instance;
  }

  // Ajoutez d'autres méthodes pour accéder à des données spécifiques
}
