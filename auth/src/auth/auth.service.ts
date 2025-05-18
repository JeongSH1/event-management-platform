import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { LoginDto } from './dto/login.dto';
import { JwtToken } from '../common/types/jwt-token-type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserCredential.name)
    private readonly userCredentialModel: Model<UserCredentialDocument>,

    private readonly jwtService: JwtService,
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

  private async _validateUser(
    username: string,
    password: string,
  ): Promise<UserCredentialDocument> {
    const user = await this.userCredentialModel.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(loginDto: LoginDto): Promise<JwtToken> {
    const { username, password } = loginDto;
    const user = await this._validateUser(username, password);

    const payload: JwtPayload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded =
        await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

      const user = await this.userCredentialModel.findOne({
        userId: decoded.sub,
      });
      if (!user || user.refreshToken !== refreshToken) {
        throw new ForbiddenException('토큰이 유효하지 않습니다.');
      }

      const newPayload: JwtPayload = {
        sub: user.userId,
        username: user.username,
        role: user.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload);
      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      });

      user.refreshToken = newRefreshToken;
      await user.save();

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');
    }
  }
}
