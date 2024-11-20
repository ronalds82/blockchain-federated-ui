import { VoteValue } from "../enums/vote-value.enum";

export interface Vote {
  modelId: string;
  vote: VoteValue;
  timestamp: string;
}