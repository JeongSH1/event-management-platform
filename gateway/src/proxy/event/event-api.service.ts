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

  async proxyCreateReward(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'POST',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event/reward`,
      data: body,
      headers,
    });
  }

  async proxyFindEvent(query: any, body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event`,
      params: query,
      data: body,
      headers,
    });
  }

  async proxyChangeEventStatus(
    params: any,
    query: any,
    body: any,
    headers: any,
  ): Promise<any> {
    const eventId = params.eventId;

    return this.httpUtilService.request({
      method: 'PATCH',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event/${eventId}`,
      params: query,
      data: body,
      headers,
    });
  }

  async proxyFindRewardClaims(
    query: any,
    body: any,
    headers: any,
  ): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event/reward-claim/log`,
      params: query,
      data: body,
      headers,
    });
  }

  async proxyCreateRewardClaim(
    params: any,
    query: any,
    body: any,
    headers: any,
  ): Promise<any> {
    const eventId = params.eventId;

    return this.httpUtilService.request({
      method: 'POST',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event/reward-claim/${eventId}`,
      params: query,
      data: body,
      headers,
    });
  }

  async proxyFindMyRewardClaim(
    query: any,
    body: any,
    headers: any,
  ): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.EVENT_SERVICE_ENDPOINT}/event/reward-claim/log/my`,
      params: query,
      data: body,
      headers,
    });
  }
}
