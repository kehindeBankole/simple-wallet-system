import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entity/wallet.entity';

@Module({
  providers: [WalletEntity],
  imports: [TypeOrmModule.forFeature([WalletEntity])],
})
export class WalletModule {}
