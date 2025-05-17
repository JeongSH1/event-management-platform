import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AuditService } from '../audit/audit.service';
import { USER_ACTION } from '../audit/constants/user-action';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly auditService: AuditService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { id, username, email } = createUserDto;

    return this.userModel.create({ id, username, email });
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.find({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // 1. 업데이트 수행
    const result = await this.userModel.updateOne({ id }, updateUserDto);

    // 2. 감사 로그 기록
    await this.auditService.createUserLog({
      userId: id,
      action: USER_ACTION.EDIT_INFO,
      after: updateUserDto,
    });

    return result;
  }

  remove(id: string) {
    return this.userModel.deleteOne({ id });
  }
}
