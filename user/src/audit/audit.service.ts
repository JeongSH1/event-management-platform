import { Injectable } from '@nestjs/common';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { USER_ACTION } from './constants/user-action';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLog, UserLogDocument } from './schemas/user-log.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(UserLog.name)
    private userLogModel: Model<UserLogDocument>,
  ) {}

  async createUserLog(createUserLogDto: CreateUserLogDto) {
    const { userId, action, after } = createUserLogDto;

    const tasks = {
      [USER_ACTION.ATTENDANCE]: async (userId: string) => {
        return this.userLogModel.create({
          userId,
          action: USER_ACTION.ATTENDANCE,
        });
      },

      [USER_ACTION.EDIT_INFO]: async (userId: string) => {
        const lastLog = await this.findOneRecentUserLog(
          userId,
          USER_ACTION.EDIT_INFO,
        );

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

  findAllUserLog() {
    return this.userLogModel.find();
  }

  findOneRecentUserLog(userId: string, action: USER_ACTION) {
    return this.userLogModel
      .findOne({ userId, action })
      .sort({ createdAt: -1 })
      .lean();
  }

  removeUserLog(userId: string) {
    return this.userLogModel.deleteMany({ userId });
  }
}
