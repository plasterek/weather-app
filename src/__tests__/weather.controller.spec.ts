import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';
import { WeatherApiCallsService } from '../weather-api-calls/weather-api-calls.service';
import { error } from 'console';

describe('AppController (e2e)', () => {
  const mockedWeather = 'excellent';
  const mockedCredentials = { key: 'X-Weather-API-KEY', value: 'apiKey' };
  let app: INestApplication;
  let weather: WeatherApiCallsService;
  let config: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
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
        {
          provide: WeatherApiCallsService,
          useValue: {
            getCurrentWeather: jest.fn(() => mockedWeather),
          },
        },
      ],
    }).compile();
    config = moduleFixture.get<ConfigService>(ConfigService);
    weather = moduleFixture.get<WeatherApiCallsService>(WeatherApiCallsService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => await app.close());

  describe('When trying to call GET on /weather', () => {
    it('It should return welcome message', () => {
      //given
      const response = { message: 'Welcome to weather app!' };
      //then
      return request(app.getHttpServer()).get('/weather/').expect(200).expect(response);
    });
  });

  describe('When trying to call GET on weather/get/country/:country and country parameter was not provided', () => {
    it('It should respond with 404 status', () => {
      //then
      return request(app.getHttpServer()).get('/weather/get/country/').expect(404);
    });
  });

  describe('When trying to call GET on /get/country/:country and country parameter is not real country', () => {
    it('It should respond with 500 status', async () => {
      //when
      jest.spyOn(weather, 'getCurrentWeather').mockRejectedValue('Error');
      //then
      return request(app.getHttpServer()).get('/weather/get/country/a').expect(500);
    });
  });

  describe('When trying to call GET on /get/country/:country and everything goes well', () => {
    it('It should respond with 200 status and "excellent" weather', () => {
      //given
      const expectedValue = { Weather: mockedWeather };
      //when
      jest.spyOn(weather, 'getCurrentWeather').mockResolvedValue(mockedWeather);
      //then
      return request(app.getHttpServer()).get('/weather/get/country/Germany').set(mockedCredentials.key, mockedCredentials.value).expect(200).expect(expectedValue);
    });
  });

  describe('When trying to call GET on weather/get/city/:city and country parameter was not provided', () => {
    it('It should respond with 404 status', () => {
      //then
      return request(app.getHttpServer()).get('/weather/get/city/').expect(404);
    });
  });

  describe('When trying to call GET on /get/city/:city and country parameter is not real country', () => {
    it('It should respond with 500 status', async () => {
      //when
      jest.spyOn(weather, 'getCurrentWeather').mockRejectedValue('Error');
      //then
      return request(app.getHttpServer()).get('/weather/get/city/a').expect(500);
    });
  });

  describe('When trying to call GET on /get/city/:city and everything goes well', () => {
    it('It should respond with 200 status and "excellent" weather', () => {
      //given
      const expectedValue = { Weather: mockedWeather };
      //when
      jest.spyOn(weather, 'getCurrentWeather').mockResolvedValue(mockedWeather);
      //then
      return request(app.getHttpServer()).get('/weather/get/city/Paris').set(mockedCredentials.key, mockedCredentials.value).expect(200).expect(expectedValue);
    });
  });

  describe('When trying to call GET on weather/get/location/:latitude/:longitude and country parameter was not provided', () => {
    it('It should respond with 404 status', () => {
      //then
      return request(app.getHttpServer()).get('/weather/get/location').expect(404);
    });
  });

  describe('When trying to call GET on /get/location/:latitude/:longitude and country parameter is not real country', () => {
    it('It should respond with 500 status', async () => {
      //when
      jest.spyOn(weather, 'getCurrentWeather').mockRejectedValue('Error');
      //then
      return request(app.getHttpServer()).get('/weather/get/location/a/b').expect(500);
    });
  });

  describe('When trying to call GET on /get/location/:latitude/:longitude and everything goes well', () => {
    it('It should respond with 200 status and "excellent" weather', () => {
      //given
      const expectedValue = { Weather: mockedWeather };
      //when
      jest.spyOn(weather, 'getCurrentWeather').mockResolvedValue(mockedWeather);
      //then
      return request(app.getHttpServer()).get('/weather/get/location/42.123/43.125').set(mockedCredentials.key, mockedCredentials.value).expect(200).expect(expectedValue);
    });
  });
});
