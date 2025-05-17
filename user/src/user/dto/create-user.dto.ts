import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  @Length(4, 20)
  username: string;

  @IsEmail()
  email: string;
}
