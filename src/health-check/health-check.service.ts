import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  async getHealthStatus() {
    return {
      running: 'ok',
    };
  }
}
