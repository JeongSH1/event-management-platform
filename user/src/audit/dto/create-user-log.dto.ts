import { IsEnum, IsObject, IsUUID } from "class-validator";
import { USER_ACTION } from '../constants/user-action';

export class CreateUserLogDto {
  @IsUUID()
  userId: string;

  @IsEnum(USER_ACTION)
  action: USER_ACTION;

  @IsObject()
  after?: Record<string, any>;
}
