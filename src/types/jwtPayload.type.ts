export type JwtPayload = {
  sub: number;
  userId: string;
  iat: number;
  exp: number;
};
export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
export type JwtPayloadForSign = {
  sub: number;
  username: string;
};
