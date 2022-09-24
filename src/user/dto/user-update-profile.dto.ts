import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateProfileDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  surname?: string;
  @ApiProperty()
  bio?: string;
}
