import { JwtPayload } from '../../../strategies/jwt.payload';

export function sanitizeHeaders(
  headers: Record<string, string | string[]>,
  user?: any,
): Record<string, string | string[]> {
  const forbiddenHeaders = [
    'host',
    'content-length',
    'connection',
    'accept-encoding',
  ];

  for (const h of forbiddenHeaders) {
    delete headers[h];
  }

  if (user) {
    headers['x-user-id'] = user?.sub;
    headers['x-user-username'] = user?.username;
    headers['x-user-role'] = user?.role;
  }

  return headers;
}
