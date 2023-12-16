import { Injectable } from '@nestjs/common';
import { WalletRepository } from './repository/wallet.repository';

@Injectable()
export class WalletService {
  constructor(private walletRepo: WalletRepository) {}

  getWallet(user) {
    return this.walletRepo.getWallet(user);
  }
  createWallet() {}
}
