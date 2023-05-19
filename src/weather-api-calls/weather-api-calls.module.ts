import { Module } from '@nestjs/common';
import { WeatherApiCallsService } from './weather-api-calls.service';

@Module({
  providers: [WeatherApiCallsService],
  exports: [WeatherApiCallsService],
})
export class WeatherApiCallsModule {}
