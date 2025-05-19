import { REWARD_ITEM_CATEGORY_CODE } from '../../reward/constants/reward-item-category.constant';

interface _RewardItemResponse {
  rewardItemCategoryCode: REWARD_ITEM_CATEGORY_CODE;
  quantity: number;
  itemId?: string;
  itemName?: string;
}

interface _RewardResponse {
  description?: string;
  rewardItems: _RewardItemResponse[];
}

export interface EventDetailResponse {
  id: string;
  title: string;
  description: string;
  startAt: string; // ISO8601 date string
  endAt: string;
  status: 'active' | 'inactive';
  conditions: {
    category: {
      code: string;
      description: string;
    };
    threshold: number;
    startAt: string;
    endAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  reward: _RewardResponse;
}
