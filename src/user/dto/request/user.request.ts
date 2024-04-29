import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUser {
  constructor(nickname: string, socialId: string) {
    this.nickname = nickname;
    this.socialId = socialId;
  }
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  socialId: string;
}

export class CreateUserDto {
  constructor(user: CreateUser) {
    this.user = user;
  }
  @IsNotEmpty()
  @Type(() => CreateUser)
  user: CreateUser;
}
