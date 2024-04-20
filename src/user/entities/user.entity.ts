import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  comment: 'user'
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  socialId: string;

  // 사진 프로퍼티 필요

  constructor(id: number, nickname: string, socialId: string) {
    this.id = id;
    this.nickname = nickname;
    this.socialId = socialId;
  }
}
