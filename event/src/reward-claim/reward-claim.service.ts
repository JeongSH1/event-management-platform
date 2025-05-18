import { Injectable } from '@nestjs/common';
import { CreateRewardClaimDto } from './dto/create-reward-claim.dto';
import { UpdateRewardClaimDto } from './dto/update-reward-claim.dto';

@Injectable()
export class RewardClaimService {
  create(createRewardClaimDto: CreateRewardClaimDto) {
    return 'This action adds a new rewardClaim';
  }

  findAll() {
    return `This action returns all rewardClaim`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rewardClaim`;
  }

  update(id: number, updateRewardClaimDto: UpdateRewardClaimDto) {
    return `This action updates a #${id} rewardClaim`;
  }

  remove(id: number) {
    return `This action removes a #${id} rewardClaim`;
  }
}
