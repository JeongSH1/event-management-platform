import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RewardClaimService } from './reward-claim.service';
import { CreateRewardClaimDto } from './dto/create-reward-claim.dto';
import { UpdateRewardClaimDto } from './dto/update-reward-claim.dto';

@Controller('reward-claim')
export class RewardClaimController {
  constructor(private readonly rewardClaimService: RewardClaimService) {}

  @Post()
  create(@Body() createRewardClaimDto: CreateRewardClaimDto) {
    return this.rewardClaimService.create(createRewardClaimDto);
  }

  @Get()
  findAll() {
    return this.rewardClaimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewardClaimService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRewardClaimDto: UpdateRewardClaimDto) {
    return this.rewardClaimService.update(+id, updateRewardClaimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardClaimService.remove(+id);
  }
}
