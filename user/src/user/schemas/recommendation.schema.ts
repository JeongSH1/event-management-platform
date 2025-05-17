import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Recommendation {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;
}

export const RecommendationSchema =
  SchemaFactory.createForClass(Recommendation);
