import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { WalletEntity } from '../entity/wallet.entity';
import { UserEntity } from 'src/auth/entity/user.entity';

@Injectable()
export class WalletRepository extends Repository<WalletEntity> {
  constructor(private dataSource: DataSource) {
    super(WalletEntity, dataSource.createEntityManager());
  }

  async createWallet(user: UserEntity) {
    const wallet = this.create({
      balance: 0,
      user,
    });
    this.save(wallet);
  }

  async getWallet(user: UserEntity) {
    try {
      return this.findOne({
        where: {
          user: {
            id: user.id,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }
  }

  async updateWallet(user: UserEntity, amount: number) {
    const userWallet = await this.getWallet(user);
    userWallet.balance = userWallet.balance += amount;
    await this.save(userWallet);
  }
}
