import { Test, TestingModule } from '@nestjs/testing';
import { WeatherApiCallsService } from '../weather-api-calls.service';
import axios from 'axios';

describe('WeatherApiCallsService', () => {
  let service: WeatherApiCallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherApiCallsService],
    }).compile();

    service = module.get<WeatherApiCallsService>(WeatherApiCallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
