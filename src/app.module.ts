import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherApiCallsService } from './weather-api-calls/weather-api-calls.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService, WeatherApiCallsService, ValidationPipe],
})
export class AppModule {}
