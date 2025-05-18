import { PartialType } from '@nestjs/mapped-types';
import { CreateRewardClaimDto } from './create-reward-claim.dto';

export class UpdateRewardClaimDto extends PartialType(CreateRewardClaimDto) {}
