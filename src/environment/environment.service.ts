import { Injectable } from '@nestjs/common';
import { parseString } from 'xml2js';
import { readFileSync } from 'fs';
import { promisify } from 'util';

@Injectable()
export class EnvironmentService {
  private environmentData: any;

  constructor() {
    this.loadEnvironmentData();
  }

  private async loadEnvironmentData() {
    try {
      const filePath = '../savegame1/environment.xml'; // Remplacez par le chemin correct de votre fichier
      const xml = readFileSync(filePath, 'utf-8');
      this.environmentData = await this.parseXmlFile(xml);
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

  getDayTime() {
    const environment = this.environmentData.environment;
    const dayTimeDatas = {
      dayTime: environment.dayTime,
      currentDay: environment.currentDay,
      currentMonotonicDay: environment.currentMonotonicDay,
      realHourTimer: environment.realHourTimer,
      daysPerPeriod: environment.daysPerPeriod,
      lighting: environment.lighting,
      weather: {
        timeSinceLastRain: environment.weather[0]?.$.timeSinceLastRain,
      },
    };

    return dayTimeDatas;
  }

  getWeatherForecast() {
    return this.environmentData.environment.weather[0]?.forecast[0]?.instance;
  }

  // Ajoutez d'autres méthodes pour accéder à des données spécifiques
}
