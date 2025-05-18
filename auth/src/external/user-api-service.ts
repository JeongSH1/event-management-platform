import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  CreateUserBody,
  CreateUserInput,
} from '../common/types/user-create-type';

@Injectable()
export class UserApiService {
  constructor(private readonly httpService: HttpService) {}

  async createUser(input: CreateUserInput): Promise<void> {
    const baseUrl = process.env.USER_ENDPOINT_URL;
    const { id, username, email, recommendedUsername } = input;

    const createUserBody: CreateUserBody = {
      id,
      username,
      email,
      recommendedUsername,
    };

    try {
      await firstValueFrom(
        this.httpService.post(`${baseUrl}/user`, createUserBody),
      );
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new HttpException(error.response.data, error.response.status || 500);
      }

      throw new HttpException(
        {
          success: false,
          message: 'Unexpected error occurred during user creation.',
          error: error.message ?? 'Unknown error',
        },
        500,
      );
    }
  }
}
