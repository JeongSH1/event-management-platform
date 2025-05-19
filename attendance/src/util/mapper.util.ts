import { AttendanceLogResponse } from '../attendance/types/attendance-log-response.type';
import { AttendanceLog } from '../attendance/log/schemas/log.schema';

export const toAttendanceLogResponse = (
  attendanceLog: AttendanceLog,
): AttendanceLogResponse => {
  return {
    userId: attendanceLog.userId,
    date: attendanceLog.createdAt,
  };
};
