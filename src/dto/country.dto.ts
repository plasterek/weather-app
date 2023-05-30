import { IsNotEmpty, MinLength } from 'class-validator';

export class CountryDTO {
  @IsNotEmpty({ message: 'Country name cannot be empty' })
  @MinLength(4, { message: 'Country name need to containt at least 1 letter' })
  readonly country: string;
}
