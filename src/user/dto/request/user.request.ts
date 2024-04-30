import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUser {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  socialId: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  user: CreateUser;
}
