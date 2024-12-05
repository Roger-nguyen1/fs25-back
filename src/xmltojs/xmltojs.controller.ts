import { Controller, Get } from '@nestjs/common';
import { XmlService } from './xmltojs.service';

@Controller('xml')
export class XmlController {
  constructor(private readonly xmlService: XmlService) {}

  @Get()
  getHello(): string {
    return 'Hello World! NestJS Farming Simulator 25 Server';
  }
}
