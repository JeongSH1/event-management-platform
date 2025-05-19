import { Event } from '../event/schemas/event.schema';
import { EventDetailResponse } from '../event/types/event-detail-resposne.type';
import { RewardItemCategory } from '../reward/schemas/reward-item-category.schema';
import { RewardItemCategoryResponse } from '../reward/types/reward-item-category.response';
import { RewardGameItem } from '../reward/schemas/reward-game-item.schema';
import { raceWith } from 'rxjs';
import { RewardGameItemResponse } from '../reward/types/reward-game-item.response';
import { Reward } from '../reward/schemas/reward.schema';
import { CreateRewardResponse } from '../event-reward/types/create-reward-response.type';

export function toEventDetailResponse(event: Event): EventDetailResponse {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    startAt: event.startAt.toISOString(),
    endAt: event.endAt.toISOString(),
    status: event.status,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
    conditions: event.conditions.map((c) => ({
      category: {
        code: c.category.code,
        description: c.category.description,
      },
      threshold: c.threshold,
      startAt: c.startAt.toISOString(),
      endAt: c.endAt.toISOString(),
    })),
  };
}

export function toRewardItemCategoryResponse(
  rewardItemCategory: RewardItemCategory,
): RewardItemCategoryResponse {
  return {
    code: rewardItemCategory.code,
    name: rewardItemCategory.name,
    description: rewardItemCategory?.description,
  };
}

export function toRewardGameItemResponse(
  rewardGameItem: RewardGameItem,
): RewardGameItemResponse {
  return {
    itemId: rewardGameItem.id,
    itemName: rewardGameItem.name,
  };
}

export function toCreateRewardResponse(reward: Reward): CreateRewardResponse {
  return {
    description: reward.description,
    rewardItems: reward.rewardItems.map((item) => ({
      rewardItemCategoryCode: item.rewardItemCategoryCode,
      quantity: item.quantity,
      itemId: item.itemId,
      itemName: item.itemName,
    })),
  };
}
