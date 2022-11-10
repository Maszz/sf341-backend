import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateProfileDto {
  username: string;
  cUsername: string;
  profile: {
    bio?: string;
    displayName?: string;
    isProfilePublic?: boolean;
  };
  newTags: string[];
  removeTags: string[];
}
