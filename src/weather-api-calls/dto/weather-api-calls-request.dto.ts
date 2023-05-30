import { IsNotEmpty } from 'class-validator';
import { ApiKeyDTO } from './api-key.dto';
import { WeatherApiCallsParameterDTO } from './weather-api-calls-parameter.dto';

export class WeatherApiCallsRequestDTO {
  readonly access_key: ApiKeyDTO;
  @IsNotEmpty()
  readonly query: WeatherApiCallsParameterDTO;
}
