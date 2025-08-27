import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  async getDashboard() {
    const result = await this.dashboardService.getDashboard();
    return {
      status: true,
      data: { ...result },
    };
  }
}
