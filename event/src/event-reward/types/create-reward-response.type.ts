import { REWARD_ITEM_CATEGORY_CODE } from '../../reward/constants/reward-item-category.constant';

export interface RewardItemResponse {
  rewardItemCategoryCode: REWARD_ITEM_CATEGORY_CODE;
  quantity: number;
  itemId?: string;
  itemName?: string;
}

export interface CreateRewardResponse {
  description?: string;
  rewardItems: RewardItemResponse[];
}
