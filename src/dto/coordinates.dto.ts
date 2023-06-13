import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class CoordinatesDTO {
  @IsNotEmpty({ message: 'You need to provide proper Latitude' })
  @IsLatitude({ message: 'Latitude need to have proper values' })
  readonly latitude: string;
  @IsNotEmpty({ message: 'You need to provide proper Longitude' })
  @IsLongitude({ message: 'Longitude need to have proper values' })
  readonly longitude: string;
}
