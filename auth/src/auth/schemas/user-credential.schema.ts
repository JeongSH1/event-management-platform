import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCredentialDocument = UserCredential & Document;

@Schema({ collection: 'user_credentials', timestamps: true })
export class UserCredential {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string; // 해시된 비밀번호

  @Prop({ required: false })
  refreshToken?: string;

  @Prop({ required: true })
  userId: string; // users 컬렉션과 연동 (참조용 ID)
}

export const UserCredentialSchema =
  SchemaFactory.createForClass(UserCredential);