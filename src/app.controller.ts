import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { HomeRequest } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: HomeRequest) {
    return this.appService.home(req);
  }
}
