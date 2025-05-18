import {
  IsDate,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CONDITION_CATEGORY_CODE } from '../constants/condition-category.constant';

export class CreateConditionDto {
  @IsEnum(CONDITION_CATEGORY_CODE)
  @IsNotEmpty()
  conditionCategoryCode: string;

  @IsNumber()
  @IsOptional()
  threshold?: number;

  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => (value ? new Date(value) : new Date('2000-01-01')))
  startAt?: Date;

  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => (value ? new Date(value) : new Date('9999-12-31')))
  endAt?: Date;
}
