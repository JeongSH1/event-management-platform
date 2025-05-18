export function sanitizeHeaders(
  headers: Record<string, string | string[]>,
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

  return headers;
}
