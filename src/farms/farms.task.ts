import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FarmsService } from './farms.service';

// @Injectable()
// export class XmlTask {
//   constructor(private readonly xmlService: XmlService) {}

//   // Planification pour toutes les heures entre 9h et 23h59 et à 4h du matin
//   @Cron('0 0 9-23,4 * * *')
//   async handleCron() {
//     const filePath = './farms.xml'; // Chemin vers le fichier XML
//     try {
//       const data = await this.xmlService.parseXmlFile(filePath);
//       await this.xmlService.saveFarmsToDb(data);
//       console.log('Farms data successfully saved to the database.');
//     } catch (error) {
//       console.error('Error processing XML file:', error.message);
//     }
//   }
// }

//Pour tester et exécuter une fois la task
@Injectable()
export class FarmsTask {
  constructor(private readonly farmsService: FarmsService) {}

  // Tâche planifiée
  @Cron('0 0 9-23,4 * * *') // Cron habituel
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
    } catch (error) {
      console.error('Error processing XML file:', error.message);
    }
  }
}
