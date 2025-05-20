import { Injectable } from '@nestjs/common';
import { FindRewardClaimLogDto } from './dto/find-reward-claim-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CLAIM_RESULT_STATUS } from './constants/claim-result-status.constant';
import {
  RewardClaimLog,
  RewardClaimLogDocument,
} from './schemas/reward-claim-log.schema';
import { RewardClaimLogResponse } from './types/reward-claim-log-response.type';
import {
  toRewardClaimLogResponse,
  toRewardProvisionLogResponse,
} from '../../util/mapper.util';
import {
  RewardProvisionLog,
  RewardProvisionLogDocument,
} from './schemas/reward-provision-log.schema';
import { FindRewardProvisionLogDto } from './dto/find-reward-provision-log.dto';
import { RewardProvisionLogResponse } from './types/reward-provision-log-response.type';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(RewardClaimLog.name)
    private readonly rewardClaimLogModel: Model<RewardClaimLogDocument>,

    @InjectModel(RewardProvisionLog.name)
    private readonly rewardProvisionLogModel: Model<RewardProvisionLogDocument>,
  ) {}

  async createRewardClaimLog(
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

  async createRewardProvisionLog(
    userId: string,
    eventId: string,
    rewardId: string,
  ): Promise<RewardProvisionLogDocument> {
    return await this.rewardProvisionLogModel.create({
      userId,
      eventId,
      rewardId,
    });
  }

  async findRewardProvisionLogs(
    query: FindRewardProvisionLogDto,
  ): Promise<RewardProvisionLogResponse[]> {
    const { userId, eventId, rewardId } = query;

    const filter: any = {};

    if (userId) filter.userId = userId;
    if (eventId) filter.eventId = eventId;
    if (rewardId) filter.rewardId = rewardId;

    const rewardProvisionLogs = await this.rewardClaimLogModel
      .find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return rewardProvisionLogs.map(toRewardProvisionLogResponse);
  }

  async findMyRewardProvisionLogs(
    userId: string,
  ): Promise<RewardProvisionLogResponse[]> {
    const rewardProvisionLogs = await this.rewardProvisionLogModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return rewardProvisionLogs.map(toRewardProvisionLogResponse);
  }

  async findRewardClaimLogs(
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

    const rewardClaimLogs = await this.rewardClaimLogModel
      .find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return rewardClaimLogs.map(toRewardClaimLogResponse);
  }

  async findMyRewardClaimLogs(
    userId: string,
  ): Promise<RewardClaimLogResponse[]> {
    const rewardClaimLogs = await this.rewardClaimLogModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return rewardClaimLogs.map(toRewardClaimLogResponse);
  }
}
