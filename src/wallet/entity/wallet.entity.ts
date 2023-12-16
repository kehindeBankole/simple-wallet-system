import { UserEntity } from 'src/auth/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  balance: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
