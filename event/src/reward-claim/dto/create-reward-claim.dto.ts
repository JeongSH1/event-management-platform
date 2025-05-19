import { IsString } from 'class-validator';

export class CreateRewardClaimDto {
  @IsString()
  eventId: string;
}
