import { IsNumber } from 'class-validator';

export class CreateUserDto {
  constructor(userId: number) {
    this.userId = userId;
  }

  @IsNumber()
  userId: number;
}
