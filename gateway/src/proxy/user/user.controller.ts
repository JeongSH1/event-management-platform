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
  @Patch()
  async editInfo(@Req() req: Request) {
    console.log('gi');
    return await this.userApiService.editInfo(
      req.body,
      sanitizeHeaders(req.headers, req.user),
    );
  }
}
