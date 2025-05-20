import { IsOptional, IsString } from 'class-validator';

export class FindRewardProvisionLogDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  eventId?: string;

  @IsOptional()
  @IsString()
  rewardId?: string;
}
