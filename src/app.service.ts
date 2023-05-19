import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public welcomeMessage() {
    return { message: 'Welcome to weather app!' };
  }
}
