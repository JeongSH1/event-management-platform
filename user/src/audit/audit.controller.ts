import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { USER_ACTION } from './constants/user-action';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('log')
  createUserLog(@Body() createUserLogDto: CreateUserLogDto) {
    return this.auditService.createUserLog(createUserLogDto);
  }

  @Get('log')
  findAllUserLog() {
    return this.auditService.findAllUserLog();
  }

  @Get('log/:userId')
  findOneRecentUserLog(
    @Param('userId') userId: string,
    @Query('action') action: USER_ACTION,
  ) {
    return this.auditService.findOneRecentUserLog(userId, action);
  }

  @Delete('log/:userId')
  removeUserLog(@Param('userId') userId: string) {
    return this.auditService.removeUserLog(userId);
  }
}
