import {TokenType} from './token.type';

export interface Token {
  token_type: TokenType;
  jti: string;
  exp: number;
  user_id: string;
  is_staff: boolean;
  first_name: string;
  last_name: string;
  email: string;
  iss: string;
}
