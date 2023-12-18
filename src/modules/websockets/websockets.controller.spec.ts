import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketsController } from './websockets.controller';

describe('WebsocketsController', () => {
  let controller: WebsocketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebsocketsController],
    }).compile();

    controller = module.get<WebsocketsController>(WebsocketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
