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
}
