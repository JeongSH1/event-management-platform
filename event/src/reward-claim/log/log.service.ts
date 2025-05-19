import { Injectable } from '@nestjs/common';
import { FindRewardClaimLogDto } from './dto/find-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventRewardService } from '../../event-reward/event-reward.service';
import { CLAIM_RESULT_STATUS } from './constants/claim-result-status.constant';
import {
  RewardClaimLog,
  RewardClaimLogDocument,
} from './schemas/reward-claim-log.schema';
import {RewardClaimLogResponse} from "./types/reward-claim-log-response.type";
import {toRewardClaimLogResponse} from "../../util/mapper.util";

@Injectable()
export class LogService {
  constructor(
    @InjectModel(RewardClaimLog.name)
    private readonly rewardClaimLogModel: Model<RewardClaimLogDocument>,

    private readonly eventRewardService: EventRewardService,
  ) {}

  async create(
    userId: string,
    eventId: string,
    status: CLAIM_RESULT_STATUS,
    rewardId?: string,
  ): Promise<RewardClaimLogDocument> {
    return await this.rewardClaimLogModel.create({
      userId,
      eventId,
      rewardId,
      status,
    });
  }

  async findLogs(
    query: FindRewardClaimLogDto,
  ): Promise<RewardClaimLogResponse[]> {
    const { userId, eventId, rewardId, status, fromDate, toDate } = query;

    const filter: any = {};

    if (userId) filter.userId = userId;
    if (eventId) filter.eventId = eventId;
    if (rewardId) filter.rewardId = rewardId;
    if (status) filter.status = status;

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const rewardClaimLogs = await this.rewardClaimLogModel.find(filter).sort({ createdAt: -1 }).lean();

    return rewardClaimLogs.map(toRewardClaimLogResponse);
  }
}
