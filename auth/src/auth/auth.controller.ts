import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtToken } from '../common/types/jwt-token-type';
import { JwtPayload } from '../common/types/jwt-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JwtToken> {
    return this.authService.login(loginDto);
  }

  @Get('refresh')
  async refresh(
    @Headers('Authorization') accessToken: string,
    @Headers('x-refresh-token') refreshToken: string,
  ): Promise<JwtToken> {
    return await this.authService.verifyTokens({ accessToken, refreshToken });
  }

  // 토큰 인증은 게이트웨이 서비스에 위임.
  // @Get('verify-token')
  // async verifyToken(
  //   @Headers('Authorization') accessToken: string,
  //   @Headers('x-refresh-token') refreshToken: string,
  // ): Promise<JwtPayload> {
  //   if (!accessToken) {
  //     throw new UnauthorizedException('토큰이 없습니다.');
  //   }
  //
  //   return await this.authService.verifyTokens({ accessToken, refreshToken });
  // }
}
