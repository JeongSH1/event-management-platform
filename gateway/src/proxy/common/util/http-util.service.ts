import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpUtilService {
  constructor(private readonly httpService: HttpService) {}

  _handleHttpError(error: any): never {
    const { response } = error;

    if (response?.data && response?.status) {
      throw new HttpException(
        {
          statusCode: response.status,
          message: response.data.message ?? '외부 요청 실패',
          error: response.data.error ?? 'External Error',
        },
        response.status,
      );
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '알 수 없는 오류',
        error: error?.message ?? 'Unknown',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.request<T>(config),
      );
      return data;
    } catch (error) {
      this._handleHttpError(error);
    }
  }
}
