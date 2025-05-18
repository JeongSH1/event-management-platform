export interface CreateUserInput {
  id: string;
  username: string;
  email: string;
  recommendedUsername?: string;
}

export interface CreateUserBody {
  id: string;
  username: string;
  email: string;
  recommendedUsername?: string;
}
