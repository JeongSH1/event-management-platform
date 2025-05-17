import { IsUUID } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  userId: string;
}
