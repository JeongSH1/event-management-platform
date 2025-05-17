import { Prop, Schema } from '@nestjs/mongoose';
import { CONDITION_CATEGORY_TYPE } from '../constants/condition-category.constant';

@Schema({ _id: false })
export class Condition {
  @Prop({ required: true, enum: CONDITION_CATEGORY_TYPE })
  category: CONDITION_CATEGORY_TYPE;

  @Prop({ required: false })
  threshold?: number;

  @Prop({ type: Date })
  startAt?: Date;

  @Prop({ type: Date })
  endAt?: Date;

  @Prop({ required: true })
  description: string; // 조건 설명 (운영자용)
}
