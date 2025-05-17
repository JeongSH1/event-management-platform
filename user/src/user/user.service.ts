import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { AuditService } from '../audit/audit.service';
import { USER_ACTION } from '../audit/constants/user-action';
import { ProfileService } from './profile/profile.service';
import { RecommendationService } from './recommendation/recommendation.service';
import { Recommendation } from './schemas/recommendation.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly auditService: AuditService,
    private readonly profileService: ProfileService,
    private readonly recommendationService: RecommendationService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { id, username, email, recommendedUsername } = createUserDto;

    const profile = this.profileService.createProfile(username, email);
    let whoRecommendedNewUser: Recommendation | undefined;

    if (recommendedUsername) {
      const result =
        await this.recommendationService.getWhoRecommendedNewUser(
          recommendedUsername,
        );
      whoRecommendedNewUser = result.whoRecommendedNewUser;
    }

    const newUser = await this.userModel.create({
      id,
      profile,
      recommendedBy: whoRecommendedNewUser, // 추천 정보 포함
    });

    if (whoRecommendedNewUser) {
      await this.recommendationService.addRecommended(
        whoRecommendedNewUser,
        newUser,
      );
      await this.auditService.createUserLog({
        userId: whoRecommendedNewUser.userId,
        action: USER_ACTION.RECOMMENDED,
      });
    }

    return newUser;
  }

  findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  findOne(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ id });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ acknowledged: boolean; modifiedCount: number }> {
    const result: UpdateWriteOpResult = await this.userModel.updateOne(
      { id },
      updateUserDto,
    );

    await this.auditService.createUserLog({
      userId: id,
      action: USER_ACTION.EDIT_INFO,
      after: updateUserDto,
    });

    return result;
  }

  remove(id: string): Promise<{ deletedCount?: number }> {
    return this.userModel.deleteOne({ id });
  }
}
