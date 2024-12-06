import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Récupérer le service et exécuter manuellement la tâche
  //const farmTask = app.get(FarmsTask);
  //await farmTask.executeTask(); // Appel manuel de la tâche pour tester
  //const environmentTask = app.get(EnvironmentTask);
  //await environmentTask.executeTask();

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
