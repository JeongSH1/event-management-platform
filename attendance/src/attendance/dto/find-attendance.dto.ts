import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAttendanceDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endAt?: Date;
}
