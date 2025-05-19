export interface EventDetailResponse {
  id: string;
  title: string;
  description: string;
  startAt: string; // ISO8601 date string
  endAt: string;
  status: 'active' | 'inactive';
  conditions: {
    category: {
      code: string;
      description: string;
    };
    threshold: number;
    startAt: string;
    endAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
