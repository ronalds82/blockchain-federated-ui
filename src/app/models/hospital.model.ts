import { Role } from "../enums/role.enum";

export interface Hospital {
  id: number;
  name?: string;
  role?: Role;
  hasVoted?: boolean;
}
