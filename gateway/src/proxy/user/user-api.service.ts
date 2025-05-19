import { Injectable } from '@nestjs/common';
import { HttpUtilService } from '../common/util/http-util.service';

@Injectable()
export class UserApiService {
  constructor(private readonly httpUtilService: HttpUtilService) {}

  async editInfo(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'PATCH',
      url: `${process.env.USER_SERVICE_ENDPOINT}/user`,
      data: body,
      headers,
    });
  }
}
