import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserCredential,
  UserCredentialDocument,
} from './schemas/user-credential.schema';
import { JwtService } from '@nestjs/jwt';
import { UserApiService } from '../external/user-api-service';
import { Role } from './constants/role.constant';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { JwtToken } from '../common/types/jwt-token-type';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

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
    const exists = await this.userCredentialModel.exists({ username });
    if (exists) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다.');
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
        return Role.USER;
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

  private _generateTokens(payload: JwtPayload): JwtToken {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  private async _storeRefreshToken(
    user: UserCredentialDocument,
    refreshToken: string,
  ) {
    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save();
  }

  async login(loginDto: LoginDto): Promise<JwtToken> {
    const { username, password } = loginDto;
    const user = await this.userCredentialModel.findOne({ username });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };

    const tokens = this._generateTokens(payload);
    await this._storeRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  async verifyTokens(jwtToken: JwtToken): Promise<JwtPayload> {
    const { accessToken, refreshToken } = jwtToken;

    try {
      return await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
        secret: process.env.JWT_SECRET,
      });
    } catch (accessErr) {
      if (accessErr.name !== 'TokenExpiredError') {
        throw new UnauthorizedException('잘못된 액세스 토큰입니다.');
      }

      return this._validateAndRefresh(refreshToken);
    }
  }

  private async _validateAndRefresh(refreshToken: string): Promise<JwtPayload> {
    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰이 필요합니다.');
    }

    let refreshPayload: JwtPayload;
    try {
      refreshPayload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch {
      throw new ForbiddenException('리프레시 토큰이 유효하지 않습니다.');
    }

    const user = await this.userCredentialModel.findOne({
      userId: refreshPayload.sub,
    });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('사용자 인증 정보가 없습니다.');
    }

    const isRefreshMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!isRefreshMatch) {
      throw new ForbiddenException('리프레시 토큰이 일치하지 않습니다.');
    }

    const newPayload: JwtPayload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };

    const tokens = this._generateTokens(newPayload);
    await this._storeRefreshToken(user, tokens.refreshToken);

    return newPayload;
  }
}
