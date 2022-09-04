export interface JwtPayload {
  sub: number;
  userId: string;
  iat: number;
  exp: number;
}
export interface JwtPayloadWithRt extends JwtPayload {
  refreshToken: string;
}
export interface JwtPayloadForSign {
  sub: number;
  username: string;
}
