import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  comment: 'user'
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nickname: string;

  @Column()
  socialId: string;

  // 사진 프로퍼티 필요
}
