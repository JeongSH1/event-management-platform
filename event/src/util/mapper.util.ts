import { Event } from '../event/schemas/event.schema';
import { EventDetailResponse } from '../event/types/event-detail-resposne.type';
import { RewardItemCategory } from '../reward/schemas/reward-item-category.schema';
import { RewardItemCategoryResponse } from '../reward/types/reward-item-category.response';

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
