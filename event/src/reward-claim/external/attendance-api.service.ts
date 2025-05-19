import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttendanceApiService {
  constructor(private readonly httpService: HttpService) {}

  async getAttendanceLogs(
    userId: string,
    startAt: Date,
    endAt: Date,
  ): Promise<any[]> {
    const baseUrl = process.env.ATTENDANCE_API_URL;

    const { data } = await firstValueFrom(
      this.httpService.get(`${baseUrl}/attendance/${userId}`, {
        params: {
          startAt: startAt?.toISOString(),
          endAt: endAt?.toISOString(),
        },
      }),
    );

    return data ?? [];
  }
}
