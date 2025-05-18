import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateConditionDto } from '../condition/dto/create-condition.dto';
import { EVENT_STATUS } from '../constants/event-status.constant';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  @Type(() => Date)
  startAt: Date;

  @IsDate()
  @Type(() => Date)
  endAt: Date;

  @IsEnum(EVENT_STATUS)
  status: EVENT_STATUS;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateConditionDto)
  conditions: CreateConditionDto[];
}
