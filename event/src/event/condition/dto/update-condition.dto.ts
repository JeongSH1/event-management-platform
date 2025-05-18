import { PartialType } from '@nestjs/mapped-types';
import { CreateConditionDto } from './create-condition.dto';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CONDITION_CATEGORY_CODE } from '../constants/condition-category.constant';
import { Transform, Type } from 'class-transformer';

export class UpdateConditionDto extends PartialType(CreateConditionDto) {
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
