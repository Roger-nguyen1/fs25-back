import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FarmsTask } from './farms/farms.task';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Récupérer le service et exécuter manuellement la tâche
  const xmlTask = app.get(FarmsTask);
  await xmlTask.executeTask(); // Appel manuel de la tâche pour tester

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
