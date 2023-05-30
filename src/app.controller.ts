import { Controller, Get, Param, Headers, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherApiCallsService } from './weather-api-calls/weather-api-calls.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CityDTO } from './dto/city.dto';
import { CountryDTO } from './dto/country.dto';
import { IsLatOrLon } from './dto/is-lat-or-lon.dto';
import { ApiKeyDTO } from './weather-api-calls/dto/api-key.dto';

@Controller('weather')
export class AppController {
  constructor(private readonly appService: AppService, private readonly weatherApi: WeatherApiCallsService) {}

  @Get()
  welcomeMessage() {
    return this.appService.welcomeMessage();
  }

  @Get('/get/country/:country')
  async getCountry(@Param('country') country: CountryDTO, @Headers('X-Weather-API-KEY') apiKey: ApiKeyDTO) {
    try {
      const weather = await this.weatherApi.getCurrentWeather(apiKey, country);
      return { Weather: weather };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/get/city/:city')
  async getCity(@Param('city') city: CityDTO, @Headers('X-Weather-API-KEY') apiKey: ApiKeyDTO) {
    console.log(city);

    try {
      const weather = await this.weatherApi.getCurrentWeather(apiKey, city);
      return { Weather: weather };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/get/location/:lat/:lon')
  async getLocation(@Param('lat') lat: IsLatOrLon, @Param('lon') lon: IsLatOrLon, @Headers('X-Weather-API-KEY') apiKey: ApiKeyDTO) {
    try {
      const coordinates: IsLatOrLon = new IsLatOrLon();
      coordinates.string = `${lat},${lon}`;
      const weather = await this.weatherApi.getCurrentWeather(apiKey, coordinates);
      return { Weather: weather };
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
