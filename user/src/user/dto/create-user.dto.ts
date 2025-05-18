import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  @Length(4, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  recommendedUsername?: string;
}
