import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RewardItemCategory,
  RewardItemCategoryDocument,
} from './schemas/reward-item-category.schema';
import { _RewardItem, CreateRewardDto } from '../event-reward/dto/create-reward.dto';
import {
  RewardGameItem,
  RewardGameItemDocument,
} from './schemas/reward-game-item.schema';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { REWARD_ITEM_CATEGORY_CODE } from './constants/reward-item-category.constant';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(RewardItemCategory.name)
    private readonly rewardItemCategoryModel: Model<RewardItemCategoryDocument>,

    @InjectModel(RewardGameItem.name)
    private readonly rewardGameItemModel: Model<RewardGameItemDocument>,

    @InjectModel(Reward.name)
    private readonly rewardModel: Model<RewardDocument>,
  ) {}

  async createReward(dto: CreateRewardDto): Promise<Reward> {

    const rewardItems = await Promise.all(
      dto.rewardItems.map(async (rewardItem: _RewardItem) => {
        if (
          rewardItem.rewardItemCategoryCode ===
          REWARD_ITEM_CATEGORY_CODE.GAME_ITEM
        ) {
          const itemMeta = await this.rewardGameItemModel.findOne({
            name: rewardItem.itemName,
          }).lean();
          if (!itemMeta) {
            throw new NotFoundException({
              statusCode: 404,
              message: `게임 아이템 정보를 찾을 수 없습니다.`,
              itemName: rewardItem.itemName,
            });
          }

          return {
            ...rewardItem,
            itemName: itemMeta.name,
          };
        }

        return rewardItem;
      }),
    );

    return await this.rewardModel.create({
      eventId: dto.eventId,
      description: dto.description,
      rewardItems,
    });
  }

  async find(ids: string[]): Promise<Reward[]> {
    return this.rewardModel.find({ id: { $in: ids } }).lean();
  }

  async findOne(id: string): Promise<Reward> {
    return this.rewardModel.findOne({ id }).lean();
  }

  async findAllItemRewardCategory(): Promise<RewardItemCategory[]> {
    return this.rewardItemCategoryModel.find().sort({ code: 1 }).lean();
  }

  async findAllRewardGameItem(): Promise<RewardGameItem[]> {
    return this.rewardGameItemModel.find().sort({ code: 1 }).lean();
  }
}
