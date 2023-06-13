import { IsNotEmpty } from 'class-validator';

export class WeatherApiCallsRequestDTO {
  @IsNotEmpty()
  readonly access_key: string;
  @IsNotEmpty()
  readonly query: string;
}
