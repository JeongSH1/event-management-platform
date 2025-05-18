import { Controller, Post, Body, Headers, Req, Res } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { Request, Response } from 'express';
import { sanitizeHeaders } from "../common/util/header.util";

@Controller('auth')
export class AuthProxyController {
  constructor(private readonly authApiService: AuthApiService) {}

  @Post('signup')
  async signup(@Req() req: Request) {
    return await this.authApiService.proxySignup(
      req.body,
      sanitizeHeaders(req.headers),
    );
  }

  @Post('login')
  async login(@Req() req: Request) {
    return await this.authApiService.proxyLogin(
      req.body,
      sanitizeHeaders(req.headers),
    );
  }
}