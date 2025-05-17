import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { REWARD_ITEM_CATEGORY_CODE } from '../constants/reward-item-category.constant';
import { Type } from 'class-transformer';

export class _RewardItem {
  @IsEnum(REWARD_ITEM_CATEGORY_CODE)
  rewardItemCategoryCode: REWARD_ITEM_CATEGORY_CODE;

  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  itemName?: string;
}

export class CreateRewardDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => _RewardItem)
  rewardItems: _RewardItem[];
}
