import { Controller, Get, Post, Param, ParseIntPipe, Headers, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { WeatherApiCallsService } from 'src/weather-api-calls/weather-api-calls.service';
import { GetException } from './exceptions/get.exception';

@Controller('weather/get')
export class GetController {
  constructor(private readonly weatherApi: WeatherApiCallsService) {}
  @Get('/country/:country')
  async getCountry(@Param('country') country: string, @Headers('X-Weather-API-KEY') apiKey: string) {
    try {
      const key: string = apiKey || process.env.API_KEY;
      if (!key) throw new UnauthorizedException('You need to provide API key!');
      if (!country || country.length < 4) throw new BadRequestException('You need to provide proper country name!');
      const weather = await this.weatherApi.getCurrentWeather(key, country);
      return { Weather: weather };
    } catch (err: any) {
      throw new GetException(err);
    }
  }

  @Get('/city/:city')
  async getCity(@Param('city') city: string, @Headers('X-Weather-API-KEY') apiKey: string) {
    try {
      const key: string = apiKey || process.env.API_KEY;
      if (!key) throw new UnauthorizedException('You need to provide API key!');
      if (!city || city.length < 1) throw new BadRequestException('You need to provide proper city name!');
      const weather = await this.weatherApi.getCurrentWeather(key, city);
      return { Weather: weather };
    } catch (err: any) {
      throw new GetException(err);
    }
  }

  @Get('/location/:lat/:lon')
  async getLocation(@Param('lat') lat: string, @Param('lon') lon: string, @Headers('X-Weather-API-KEY') apiKey: string) {
    try {
      const key: string = apiKey || process.env.API_KEY;
      if (!key) throw new UnauthorizedException('You need to provide API key!');
      if (!lat || !lon || lat.length < 7 || lon.length < 7) throw new BadRequestException('You need to provide proper coordinates!');
      const coordinates: string = `${lat},${lon}`;
      const weather = await this.weatherApi.getCurrentWeather(key, coordinates);
      return { Weather: weather };
    } catch (err: any) {
      throw new GetException(err);
    }
  }
}
