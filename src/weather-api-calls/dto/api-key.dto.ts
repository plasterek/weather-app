import { IsNotEmpty, MinLength } from 'class-validator';

export class ApiKeyDTO {
  @IsNotEmpty({ message: 'You need to provide proper API key' })
  @MinLength(1, { message: 'Your API key is to short' })
  private readonly apiKey: string;
}
