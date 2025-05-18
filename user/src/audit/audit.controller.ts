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

@Controller('audit/user')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('log')
  createUserLog(@Body() createUserLogDto: CreateUserLogDto) {
    return this.auditService.createUserLog(createUserLogDto);
  }

  @Get('/log')
  findAllLog() {
    return this.auditService.findAllLog();
  }

  @Get('log/:userId')
  findUserLog(
    @Param('userId') userId: string,
    @Query('action') action?: USER_ACTION,
  ) {
    return this.auditService.findUserLog(userId, action);
  }

  @Delete('log/:userId')
  removeUserLog(@Param('userId') userId: string) {
    return this.auditService.removeUserLog(userId);
  }
}
