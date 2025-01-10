import { Role } from "../enums/role.enum";
import { VoteValue } from "../enums/vote-value.enum";

export interface Hospital {
  hospitalWalletAddress: string;
  name: string;
  role: Role;
  vote: VoteValue;
}
