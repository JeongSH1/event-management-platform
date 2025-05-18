import { IsString } from 'class-validator';

export class CreateRewardClaimDto {
  @IsString()
  userId: string;

  @IsString()
  eventId: string;
}
