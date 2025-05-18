import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttendanceApiService {
  constructor(private readonly httpService: HttpService) {}

  async getAttendanceCount(userId: string, startAt?: Date, endAt?: Date): Promise<number> {
    const baseUrl = process.env.ATTENDANCE_API_URL;

    const { data } = await firstValueFrom(
      this.httpService.get(`${baseUrl}/api/summary`, {
        params: {
          userId,
          startAt: startAt?.toISOString(),
          endAt: endAt?.toISOString(),
        },
      }),
    );

    return data.count;
  }
}