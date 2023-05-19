import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetModule } from './get/get.module';
import { WeatherApiCallsModule } from './weather-api-calls/weather-api-calls.module';
import { GetController } from './get/get.controller';

@Module({
  imports: [GetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
