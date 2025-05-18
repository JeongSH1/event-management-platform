import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import {
  UserCredential,
  UserCredentialDocument,
} from './schemas/user-credential.schema';
import { UserApiService } from '../external/user-api-service';

import { Role } from './constants/role.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserCredential.name)
    private readonly userCredentialModel: Model<UserCredentialDocument>,
    private readonly userApiService: UserApiService,
  ) {}

  private async _checkDuplicatedFieldsOrThrow(username: string) {
    if (!username) return;

    if (username) {
      const exists = await this.userCredentialModel.exists({
        username,
      });
      if (exists) {
        throw new BadRequestException('이미 사용 중인 닉네임입니다.');
      }
    }
  }

  private async _getRole(secretCode?: string): Promise<Role> {
    switch (secretCode) {
      case process.env.ADMIN_SECRET_CODE:
        return Role.ADMIN;
      case process.env.AUDITOR_SECRET_CODE:
        return Role.AUDITOR;
      case process.env.OPERATOR_SECRET_CODE:
        return Role.OPERATOR;
      default:
        return Role.USER; // 기본 권한
    }
  }

  async signup(signupDto: SignupDto): Promise<void> {
    const { username, email, password, recommendedUsername, secretCode } =
      signupDto;

    await this._checkDuplicatedFieldsOrThrow(username);

    const hashed = await bcrypt.hash(password, 10);
    const role = await this._getRole(secretCode);

    const userCredential = await this.userCredentialModel.create({
      username,
      password: hashed,
      role,
    });

    await this.userApiService.createUser({
      id: userCredential.userId,
      username,
      email,
      recommendedUsername,
    });
  }
}
