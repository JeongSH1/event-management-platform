import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserApiService {
  constructor(private readonly httpService: HttpService) {}

  async getUserEditInfoLogs(userId: string): Promise<any[]> {
    const baseUrl = process.env.USER_ENDPOINT_URL;

    const { data } = await firstValueFrom(
      this.httpService.get(`${baseUrl}/audit/log/${userId}?action=edit_info`),
    );

    return data;
  }
}