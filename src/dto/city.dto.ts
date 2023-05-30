import { IsNotEmpty, MinLength } from 'class-validator';

export class CityDTO {
  @IsNotEmpty({ message: 'City name cannot be empty' })
  @MinLength(1, { message: 'City name need to containt at least 1 letter' })
  city: string;
}
