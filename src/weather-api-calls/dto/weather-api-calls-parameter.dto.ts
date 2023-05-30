import { CityDTO } from 'src/dto/city.dto';
import { CountryDTO } from 'src/dto/country.dto';
import { IsLatOrLon } from 'src/dto/is-lat-or-lon.dto';

export type WeatherApiCallsParameterDTO = CityDTO | CountryDTO | IsLatOrLon;
