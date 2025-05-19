import { Injectable } from '@nestjs/common';
import { HttpUtilService } from '../common/util/http-util.service';

@Injectable()
export class UserApiService {
  constructor(private readonly httpUtilService: HttpUtilService) {}

  async proxyFindAllUserLog(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.USER_SERVICE_ENDPOINT}/user/audit/log`,
      data: body,
      headers,
    });
  }

  async proxyFindAllUser(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.USER_SERVICE_ENDPOINT}/user`,
      data: body,
      headers,
    });
  }

  async proxyEditInfo(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'PATCH',
      url: `${process.env.USER_SERVICE_ENDPOINT}/user/my`,
      data: body,
      headers,
    });
  }

  async proxyFindEditInfoLog(
    query: any,
    body: any,
    headers: any,
  ): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.USER_SERVICE_ENDPOINT}/user/audit/log/my`,
      params: query,
      data: body,
      headers,
    });
  }
}
