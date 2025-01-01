import { Controller, Get, HttpCode } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  async helloWorld() {
    let status = 'running';

    // Get health info
    const { canConnect: canConnectDb } = await this.appService.getDbStatus();

    // Got some errors
    if ([!canConnectDb].some(v => v === false)) {
      status = 'running with errors';
    }

    return {
      status,
    };
  }
}
