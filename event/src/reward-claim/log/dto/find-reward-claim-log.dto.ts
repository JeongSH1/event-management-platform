import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { CLAIM_RESULT_STATUS } from '../constants/claim-result-status.constant';

export class FindRewardClaimLogDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  eventId?: string;

  @IsOptional()
  @IsString()
  rewardId?: string;

  @IsOptional()
  @IsEnum(CLAIM_RESULT_STATUS)
  status?: CLAIM_RESULT_STATUS;

  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;
}
