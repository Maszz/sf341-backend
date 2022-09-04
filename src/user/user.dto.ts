export class UserRespondDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  name: string;
  email: string;
  hashpw: string;
  hashedRt: string | null;
}
