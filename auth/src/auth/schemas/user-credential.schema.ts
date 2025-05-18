import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { generateUserId } from '../../util/uuid.util';
import { Role } from '../constants/role.constant';

export type UserCredentialDocument = UserCredential & Document;

@Schema({ collection: 'user_credentials', timestamps: true })
export class UserCredential {
  @Prop({
    type: String,
    unique: true,
    default: () => generateUserId(),
  })
  userId: string; // users 컬렉션과 연동 (참조용 ID)

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string; // 해시된 비밀번호

  @Prop({ required: false })
  refreshToken?: string;

  @Prop({ required: true, enum: Role })
  role: Role;
}

export const UserCredentialSchema =
  SchemaFactory.createForClass(UserCredential);