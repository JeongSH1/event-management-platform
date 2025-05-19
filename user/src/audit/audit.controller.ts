import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Headers,
  ParseEnumPipe,
} from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { USER_ACTION } from './constants/user-action';
import { AuditUserLogResponse } from './types/user-log-response.type';

@Controller('user/audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('log')
  createUserLog(@Body() createUserLogDto: CreateUserLogDto) {
    return this.auditService.createUserLog(createUserLogDto);
  }

  @Get('log')
  findAllLog() {
    return this.auditService.findAllLog();
  }

  @Get('log/my')
  findMyLog(
    @Headers('x-user-id') userId: string,
    @Query('action', new ParseEnumPipe(USER_ACTION, { optional: true }))
    action?: USER_ACTION,
  ): Promise<AuditUserLogResponse[]> {
    return this.auditService.findUserLog(userId, action);
  }

  @Get('log/:userId')
  findUserLog(
    @Param('userId') userId: string,
    @Query('action', new ParseEnumPipe(USER_ACTION, { optional: true }))
    action?: USER_ACTION,
  ): Promise<AuditUserLogResponse[]> {
    return this.auditService.findUserLog(userId, action);
  }

  @Delete('log/user/:userId')
  removeUserLog(@Param('userId') userId: string) {
    return this.auditService.removeUserLog(userId);
  }
}
