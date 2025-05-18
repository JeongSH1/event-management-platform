import {
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
