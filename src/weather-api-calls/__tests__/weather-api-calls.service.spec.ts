import { Test, TestingModule } from '@nestjs/testing';
import { WeatherApiCallsService } from '../weather-api-calls.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { WeatherApiCallsException } from '../exceptions/weather-api-calls.exception';

describe('WeatherApiCallsService', () => {
  const apiKey: string = 'apiKey';
  const query: string = 'London';
  let service: WeatherApiCallsService;
  let config: ConfigService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherApiCallsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'CURRENT_URL') {
                return 'http://adress.com';
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherApiCallsService>(WeatherApiCallsService);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When trying to get current weather and apiKey is not valid', () => {
    it('It should throw an WeatherApiCallsException', () => {
      //given
      const response = { status: 404 };
      //when
      jest.spyOn(axios, 'get').mockResolvedValue(response);
      //then
      expect(async () => await service.getCurrentWeather(apiKey, query)).rejects.toThrow(WeatherApiCallsException);
    });
  });

  describe('When trying to get current weather and everything goes well', () => {
    it('It should return status 200 and', async () => {
      //given
      const responseData = { weather: 'excellent' };
      const response = { status: 200, data: responseData };
      //when
      jest.spyOn(axios, 'get').mockResolvedValue(response);
      const result = await service.getCurrentWeather(apiKey, query);
      //then
      expect(result).toMatchObject(responseData);
    });
  });
});
