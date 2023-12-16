import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './auth/repository/user.repository';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';
import { WalletModule } from './wallet/wallet.module';
import { WalletRepository } from './wallet/repository/wallet.repository';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'wallet',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    WalletModule,
    TransactionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController, AuthController, WalletController],
  providers: [
    AppService,
    AuthService,
    UserRepository,
    WalletService,
    WalletRepository,
  ],
})
export class AppModule {}
