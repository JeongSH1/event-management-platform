export interface AuditUserLogResponse {
    userId: string;
    action: string;
    before?: Record<string, any>;
    after?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}