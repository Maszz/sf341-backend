import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiOkResponse } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  deviceId: string;
}
export class SignInRequestDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  deviceId: string;
}
export class TokenDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}

export class TokenDtoWithUserId extends TokenDto {
  @ApiProperty()
  userId: string;
}

export class UserFromJwtDto {
  @ApiProperty()
  sub: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  iat: number;
  @ApiProperty()
  exp: number;
}
