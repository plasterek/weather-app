import { Injectable } from '@nestjs/common';
import { WeatherApiCallsException } from './exceptions/weather-api-calls.exception';
import { WeatherApiCallsRequestDTO } from './dto/weather-api-calls-request.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherApiCallsService {
  constructor(private configService: ConfigService) {}
  public async getCurrentWeather(apiKey: string, param: string): Promise<any> {
    const url: URL = new URL(this.configService.get<string>('CURRENT_URL'));
    const parameters: WeatherApiCallsRequestDTO = { access_key: apiKey, query: param };
    const requestURL: string = url.href;
    const response = await axios.get(requestURL, { params: parameters });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new WeatherApiCallsException('Unable to get current weather from API');
    }
  }
}
