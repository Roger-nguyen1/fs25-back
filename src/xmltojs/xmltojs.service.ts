import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parseString } from 'xml2js';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { Farm } from './farm.schema';

@Injectable()
export class XmlService {
  constructor(@InjectModel(Farm.name) private farmModel: Model<Farm>) {}

  async parseXmlFile(filePath: string): Promise<any> {
    try {
      const xml = fs.readFileSync(filePath, 'utf-8');
      return new Promise((resolve, reject) => {
        parseString(xml, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  async saveFarmsToDb(data: any): Promise<void> {
    const farms = data.farms.farm.map((farm: any) => ({
      farmId: farm.$?.farmId || '',
      name: farm.$?.name || '',
      money: farm.$?.money ? parseFloat(farm.$.money) : 0,
      players: this.extractPlayers(farm.players[0]?.player),
      finances: this.extractFinancialStats(farm.finances?.[0]?.stats || []),
    }));

    for (const farm of farms) {
      const { farmId, finances, ...updateData } = farm;

      const updatedAt = moment().tz('Europe/Paris').format();

      await this.farmModel.updateOne(
        { farmId },
        {
          $set: {
            ...updateData,
            finances,
            updatedAt, // Remplacer ou mettre à jour les finances
          },
        },
        { upsert: true },
      );
    }
  }

  private mergeFinances(
    existingFinances: Record<string, number | string>[],
    newFinances: Record<string, number | string>[],
  ): Record<string, number | string>[] {
    const merged = [...existingFinances];

    newFinances.forEach((newStat) => {
      const exists = merged.some(
        (existingStat) =>
          JSON.stringify(existingStat) === JSON.stringify(newStat), // Comparaison
      );

      if (!exists) {
        merged.push(newStat);
      }
    });

    return merged;
  }

  private extractPlayers(playersData: any[]): string[] {
    return playersData
      .map((player) => player.$?.lastNickname || '')
      .filter(Boolean);
  }

  private extractFinancialStats(
    stats: any[],
  ): Record<string, number | string>[] {
    if (!stats || !Array.isArray(stats)) return [];

    // Trouver le jour maximum
    const maxDay = Math.max(
      ...stats.map((stat) => parseInt(stat.$?.day || '0', 10)),
    );

    // Extraire uniquement les statistiques du dernier jour
    const lastDayStats = stats.find(
      (stat) => parseInt(stat.$?.day || '0', 10) === maxDay,
    );

    if (!lastDayStats) return [];

    const financialStat: Record<string, number | string> = {};

    // Parcourir les propriétés du dernier jour
    Object.entries(lastDayStats).forEach(([key, value]) => {
      if (key === '$' && typeof value === 'object' && value !== null) {
        // Inclure l'attribut `day` s'il existe dans `$`
        if ('day' in value) {
          const dayValue = value.day as unknown; // Affiner le type ici
          if (typeof dayValue === 'string' || typeof dayValue === 'number') {
            financialStat['day'] = dayValue;
          }
        }
      } else if (Array.isArray(value) && value.length > 0) {
        // Inclure les valeurs simples si elles existent
        const numValue = parseFloat(value[0]);
        if (!isNaN(numValue) && numValue !== 0) {
          financialStat[key] = numValue;
        }
      }
    });

    return [financialStat];
  }
}
