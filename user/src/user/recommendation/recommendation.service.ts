import { Injectable, BadRequestException } from '@nestjs/common';
import { Recommendation } from '../schemas/recommendation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getWhoRecommendedNewUser(
    recommendedUsername: string,
  ): Promise<{
    whoRecommendedNewUser: Recommendation;
  }> {
    const whoRecommendedNewUser: UserDocument | null =
      await this.userModel.findOne({
        'profile.username': recommendedUsername,
      });

    if (!whoRecommendedNewUser) {
      throw new BadRequestException({
        statusCode: 400,
        message: '유효하지 않은 추천인입니다.',
        error: 'Bad Request',
      });
    }

    return {
      whoRecommendedNewUser: {
        userId: whoRecommendedNewUser.id,
        username: whoRecommendedNewUser.profile.username,
      },
    };
  }

  async addRecommended(
    whoRecommendedNewUser: Recommendation,
    newUser: { id: string; profile: { username: string } },
  ): Promise<void> {
    if (!whoRecommendedNewUser) return;

    const result = await this.userModel.updateOne(
      { id: whoRecommendedNewUser.userId },
      {
        $push: {
          recommendations: {
            userId: newUser.id,
            username: newUser.profile.username,
          },
        },
      },
    );

    if (result.matchedCount === 0) {
      throw new BadRequestException('추천인 유저를 찾을 수 없습니다.');
    }
  }
}