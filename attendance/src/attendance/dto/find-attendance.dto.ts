import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAttendanceDto {
  @IsDate()
  @Type(() => Date)
  startAt: Date;

  @IsDate()
  @Type(() => Date)
  endAt: Date;
}
