import { UserLog } from '../audit/schemas/user-log.schema';
import { AuditUserLogResponse } from '../audit/types/user-log-response.type';

export function toAuditUserLogResponse(log: UserLog): AuditUserLogResponse {
  return {
    userId: log.userId,
    action: log.action,
    before: log?.before,
    after: log?.after,
    createdAt: log?.createdAt.toISOString(),
    updatedAt: log?.updatedAt.toISOString(),
  };
}
