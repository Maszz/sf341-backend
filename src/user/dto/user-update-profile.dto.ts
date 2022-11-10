import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateProfileDto {
  username: string;
  cUsername: string;
  profile: {
    bio?: string;
    displayName?: string;
  };
  tags: string[];
}
