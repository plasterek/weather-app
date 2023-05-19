import { Injectable } from '@nestjs/common';
import { WeatherApiCallsException } from './exceptions/weather-api-calls.exception';
import axios from 'axios';
import { WeatherApiCallsRequestDTO } from './dto/weather-api-calls-request.dto';

@Injectable()
export class WeatherApiCallsService {
  public async getCurrentWeather(apiKey: string, param: string) {
    try {
      const url: URL = new URL(process.env.CURRENT_URL);
      const params: WeatherApiCallsRequestDTO = { access_key: apiKey, query: param };
      const requestURL: string = url.href;
      const response = await axios.get(requestURL, { params });
      return response.data;
    } catch (err: any) {
      throw new WeatherApiCallsException(err);
    }
  }
}
