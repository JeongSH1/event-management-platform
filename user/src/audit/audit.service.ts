import { Injectable } from '@nestjs/common';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { USER_ACTION } from './constants/user-action';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLog, UserLogDocument } from './schemas/user-log.schema';
import { toAuditUserLogResponse } from '../util/mapper.util';
import { AuditUserLogResponse } from './types/user-log-response.type';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(UserLog.name)
    private userLogModel: Model<UserLogDocument>,
  ) {}

  async createUserLog(createUserLogDto: CreateUserLogDto): Promise<UserLog> {
    const { userId, action, after } = createUserLogDto;

    const tasks: Record<USER_ACTION, (userId: string) => Promise<UserLog>> = {
      [USER_ACTION.RECOMMENDED]: async (userId: string) => {
        return this.userLogModel.create({
          userId,
          action: USER_ACTION.RECOMMENDED,
        });
      },

      [USER_ACTION.SIGN_UP]: async (userId: string) => {
        return this.userLogModel.create({
          userId,
          action: USER_ACTION.SIGN_UP,
          after,
        });
      },

      [USER_ACTION.EDIT_INFO]: async (userId: string) => {
        let lastLog = await this.findOneRecentUserLog(
          userId,
          USER_ACTION.EDIT_INFO,
        );

        if (!lastLog) {
          lastLog = await this.findOneRecentUserLog(
            userId,
            USER_ACTION.SIGN_UP,
          );
        }

        return this.userLogModel.create({
          userId,
          action: USER_ACTION.EDIT_INFO,
          before: lastLog?.after,
          after,
        });
      },
    };

    if (!tasks[action]) {
      throw new Error(`Unsupported action: ${action}`);
    }

    return tasks[action](userId);
  }

  async findAllLog(action?: USER_ACTION): Promise<AuditUserLogResponse[]> {
    const userLogs = await this.userLogModel
      .find(action ? { action } : {})
      .select('-_id -__v')
      .lean();
    return userLogs.map(toAuditUserLogResponse);
  }

  async findUserLog(
    userId: string,
    action?: USER_ACTION,
  ): Promise<AuditUserLogResponse[]> {
    const query: any = { userId };

    if (action) {
      query.action = action;
    }
    const userLogs = await this.userLogModel
      .find(query)
      .sort({ createdAt: -1 })
      .lean();
    return userLogs.map(toAuditUserLogResponse);
  }

  findOneRecentUserLog(
    userId: string,
    action: USER_ACTION,
  ): Promise<UserLog | null> {
    return this.userLogModel
      .findOne({ userId, action })
      .sort({ createdAt: -1 })
      .lean();
  }

  removeUserLog(userId: string): Promise<{ deletedCount?: number }> {
    return this.userLogModel.deleteMany({ userId });
  }
}
