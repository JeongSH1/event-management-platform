import { Injectable } from '@nestjs/common';
import { HttpUtilService } from '../common/util/http-util.service';

@Injectable()
export class AttendanceApiService {
  constructor(private readonly httpUtilService: HttpUtilService) {}

  async proxyMakeAttendance(query: any, body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'POST',
      url: `${process.env.ATTENDANCE_SERVICE_ENDPOINT}/attendance`,
      params: query,
      data: body,
      headers,
    });
  }

  async proxyFindAllAttendanceLog(body: any, headers: any): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.ATTENDANCE_SERVICE_ENDPOINT}/attendance`,
      data: body,
      headers,
    });
  }

  async proxyFindMyAttendanceLog(
    query: any,
    body: any,
    headers: any,
  ): Promise<any> {
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.ATTENDANCE_SERVICE_ENDPOINT}/attendance/my`,
      params: query,
      data: body,
      headers,
    });
  }

  async proxyFindAttendanceLog(
    params: any,
    query: any,
    body: any,
    headers: any,
  ): Promise<any> {
    const userId = params?.userId ?? '';
    return this.httpUtilService.request({
      method: 'GET',
      url: `${process.env.ATTENDANCE_SERVICE_ENDPOINT}/attendance/${userId}`,
      params: query,
      data: body,
      headers,
    });
  }
}
