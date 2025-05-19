import { Injectable } from '@nestjs/common';
import { HttpUtilService } from '../common/util/http-util.service';

@Injectable()
export class AuthApiService {
  constructor(private readonly httpUtilService: HttpUtilService) {}

  async proxySignup(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'POST',
      url: `${process.env.AUTH_SERVICE_ENDPOINT}/auth/signup`,
      data: body,
      headers,
    });
  }

  async proxyLogin(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'POST',
      url: `${process.env.AUTH_SERVICE_ENDPOINT}/auth/login`,
      data: body,
      headers,
    });
  }

  async proxyRefresh(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.AUTH_SERVICE_ENDPOINT}/auth/refresh`,
      data: body,
      headers,
    });
  }
}