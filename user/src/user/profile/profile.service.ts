import { Injectable } from '@nestjs/common';
import { Profile } from '../schemas/profile.schema';

@Injectable()
export class ProfileService {
  createProfile(username: string, email: string): Profile {
    return { username, email };
  }

  createDefaultProfile(): Profile {
    return {
      username: 'guest',
      email: 'guest@example.com',
    };
  }
}
