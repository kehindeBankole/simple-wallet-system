import { BadRequestException, Injectable } from '@nestjs/common';
import { confirmTransactionDTO } from './dto/ConfirmTransaction.dto';
import { ConfirmTransaction } from './types';
import { WalletRepository } from 'src/wallet/repository/wallet.repository';
import { UserEntity } from 'src/auth/entity/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionService {
  constructor(
    private walletRepo: WalletRepository,
    private configService: ConfigService,
  ) {}
  BASE_URL = this.configService.get<string>('PAYSTACK_CONFIRM_URL');
  PUBLIC_KEY = this.configService.get<string>('PAYSTACK_PUBLIC_KEY');

  async confirmTransaction(ref: confirmTransactionDTO, user: UserEntity) {
    try {
      const data = await fetch(`${this.BASE_URL}/${ref.ref}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.PUBLIC_KEY}`,
        },
      });
      const res: ConfirmTransaction = await data.json();

      if (res.data.status === 'success') {
        this.walletRepo.updateWallet(user, res.data.amount);
      }
      return res;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error),
        description: 'Some error description',
      });
    }
  }
}
