import { IsLatLong, IsNotEmpty } from 'class-validator';

export class IsLatOrLon {
  @IsNotEmpty({ message: 'You need to provide proper Latitude and Longitude' })
  @IsLatLong({ message: 'Latitude and Longitude need to have proper values' })
  string: string;
}
