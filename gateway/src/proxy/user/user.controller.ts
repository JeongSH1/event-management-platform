import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserProxyController {
  constructor(private readonly appService) {}

}
