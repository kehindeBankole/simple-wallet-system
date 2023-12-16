import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WalletRepository } from 'src/wallet/repository/wallet.repository';

@Module({
  providers: [JwtStrategy, AuthService, UserRepository, WalletRepository],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'kehinde',
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [TypeOrmModule],
})
export class AuthModule {}
