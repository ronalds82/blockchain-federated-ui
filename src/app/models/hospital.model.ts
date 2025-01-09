import { Role } from "../enums/role.enum";
import { VoteValue } from "../enums/vote-value.enum";

export interface Hospital {
  hospitalWalletAddress: string;
  name: string;
  role: Role; // 0=Null,1=Miner,2=Trainer
  vote: VoteValue; // 0=Null,1=Accept,2=Reject
}
