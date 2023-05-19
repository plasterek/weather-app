import { Module } from '@nestjs/common';
import { GetController } from './get.controller';
import { WeatherApiCallsModule } from 'src/weather-api-calls/weather-api-calls.module';
import { WeatherApiCallsService } from 'src/weather-api-calls/weather-api-calls.service';

@Module({
  controllers: [GetController],
  imports: [WeatherApiCallsModule],
  providers: [WeatherApiCallsService],
})
export class GetModule {}
