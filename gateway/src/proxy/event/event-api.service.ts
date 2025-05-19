import { Injectable } from '@nestjs/common';
import { HttpUtilService } from '../common/util/http-util.service';

@Injectable()
export class EventApiService {
  constructor(private readonly httpUtilService: HttpUtilService) {}

  async proxyConditionCategory(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event/condition/category`,
      data: body,
      headers,
    });
  }

  async proxyCreateEvent(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'POST',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event`,
      data: body,
      headers,
    });
  }

  async proxyRewardItemCategory(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event/reward/item-category`,
      data: body,
      headers,
    });
  }

  async proxyGameItemCategory(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event/reward/game-item`,
      data: body,
      headers,
    });
  }
}
