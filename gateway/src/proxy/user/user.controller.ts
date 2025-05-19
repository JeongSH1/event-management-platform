import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/role.constant';
import { Request } from 'express';
import { sanitizeHeaders } from '../common/util/header.util';

@Controller('user')
export class UserProxyController {
  constructor(private readonly userApiService: UserApiService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('my')
  async editInfo(@Req() req: Request) {
    return await this.userApiService.proxyEditInfo(
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('audit/log/my')
  async findEditInfoLog(@Req() req: Request) {
    return await this.userApiService.proxyFindEditInfoLog(
      req.query,
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }
}
