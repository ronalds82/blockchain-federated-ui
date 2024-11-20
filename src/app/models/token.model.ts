import { TokenType } from "@angular/compiler";

export interface Token {
  amount: number;
  type: TokenType;
  reason: string;
  timestamp: string;
}
  
export interface TokenDetails {
  hospitalId: number;
  tokens: number;
  transactions: Token[];
}
  