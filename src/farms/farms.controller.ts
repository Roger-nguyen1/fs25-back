import { Controller, Get } from '@nestjs/common';
import { FarmsService } from './farms.service';

@Controller('xml')
export class XmlController {
  constructor(private readonly farmService: FarmsService) {}

  @Get()
  getHello(): string {
    return 'Hello World! NestJS Farming Simulator 25 Server';
  }
}
