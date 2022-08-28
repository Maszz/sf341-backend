import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  username: string;
  password: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
}
export class SignInRequestDto {
  username: string;
  password: string;
}
export class TokenDto {
  access_token: string;
  refresh_token: string;
}
