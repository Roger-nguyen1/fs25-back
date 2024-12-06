import { Controller, Get } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Get()
  getEnvironmentData() {
    return; //this.environmentService.getEnvironmentData();
  }

  @Get('day-time')
  getDayTime() {
    return; //this.environmentService.getDayTime();
  }

  @Get('weather-forecast')
  getWeatherForecast() {
    return; //this.environmentService.getWeatherForecast();
  }
}
