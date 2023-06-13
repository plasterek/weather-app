import { Controller, Get, Param, Headers, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherApiCallsService } from './weather-api-calls/weather-api-calls.service';
import { CityDTO } from './dto/city.dto';
import { CountryDTO } from './dto/country.dto';
import { CoordinatesDTO } from './dto/coordinates.dto';
import { ApiKeyDTO } from './weather-api-calls/dto/api-key.dto';
import { AllExceptionsFilter } from './exceptions/all-exceptions-filter';
import { ValidationErrorFilter } from './exceptions/validation-error-filter';

@Controller('weather')
@UseFilters(AllExceptionsFilter)
export class WeatherController {
  constructor(private readonly appService: AppService, private readonly weatherApi: WeatherApiCallsService) {}

  @Get()
  welcomeMessage() {
    return this.appService.welcomeMessage();
  }

  @Get('/get/country/:country')
  async getCountry(@Param() countryDTO: CountryDTO, @Headers('X-Weather-API-KEY') apiKey: ApiKeyDTO) {
    const country: string = countryDTO.country;
    const key: string = apiKey.toString();
    const weather: Promise<any> = await this.weatherApi.getCurrentWeather(key, country);
    return { Weather: weather };
  }

  @Get('/get/city/:city')
  async getCity(@Param() cityDTO: CityDTO, @Headers('X-Weather-API-KEY') apiKey: ApiKeyDTO) {
    const city: string = cityDTO.city;
    const key: string = apiKey.toString();
    const weather: Promise<any> = await this.weatherApi.getCurrentWeather(key, city);
    return { Weather: weather };
  }

  @Get('/get/location/:latitude/:longitude')
  async getLocation(@Param() coordinates: CoordinatesDTO, @Headers('X-Weather-API-KEY') apiKey: ApiKeyDTO) {
    const coords: string = `${coordinates.latitude},${coordinates.longitude}`;
    const key: string = apiKey.toString();
    const weather: Promise<any> = await this.weatherApi.getCurrentWeather(key, coords);
    return { Weather: weather };
  }
}
