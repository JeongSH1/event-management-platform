import { Role } from '../../auth/constants/role.constant';

export interface JwtPayload {
  sub: string;
  username: string;
  role: Role;
}
