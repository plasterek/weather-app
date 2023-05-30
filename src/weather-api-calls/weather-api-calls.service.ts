import { Injectable } from '@nestjs/common';
import { WeatherApiCallsException } from './exceptions/weather-api-calls.exception';
import { WeatherApiCallsRequestDTO } from './dto/weather-api-calls-request.dto';
import { ConfigService } from '@nestjs/config';
import { WeatherApiErrorResponseDTO } from './dto/weather-api-error-response.dto';
import axios from 'axios';
import { ApiKeyDTO } from './dto/api-key.dto';
import { WeatherApiCallsParameterDTO } from './dto/weather-api-calls-parameter.dto';

@Injectable()
export class WeatherApiCallsService {
  constructor(private configService: ConfigService) {}
  public async getCurrentWeather(apiKey: ApiKeyDTO, param: WeatherApiCallsParameterDTO) {
    try {
      const url: URL = new URL(this.configService.get<string>('CURRENT_URL'));
      const params: WeatherApiCallsRequestDTO = { access_key: apiKey, query: param };
      const requestURL: string = url.href;
      const response = await axios.get(requestURL, { params });
      if (response.status === 200) return response.data;
      const errorResponse: WeatherApiErrorResponseDTO = response.data;
      throw new WeatherApiCallsException(`${errorResponse.error.info}`, errorResponse.error.code);
    } catch (err: any) {
      throw new WeatherApiCallsException(err.message, err.status);
    }
  }
}
