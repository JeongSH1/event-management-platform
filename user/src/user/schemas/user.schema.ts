import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Profile, ProfileSchema } from './profile.schema';
import { Recommendation, RecommendationSchema } from './recommendation.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ type: ProfileSchema, required: true })
  profile: Profile;

  @Prop({ type: RecommendationSchema, required: false })
  recommend?: Recommendation;

  @Prop({ type: [RecommendationSchema], default: [] })
  recommendedBy: Recommendation[];
}

export const UserSchema = SchemaFactory.createForClass(User);
