import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { WalletRepository } from 'src/wallet/repository/wallet.repository';

@Module({
  providers: [TransactionService, WalletRepository],
  controllers: [TransactionController],
})
export class TransactionModule {}
