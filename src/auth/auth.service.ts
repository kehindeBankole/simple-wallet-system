import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from './dto/SignIn.dto';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDTO } from './dto/SignUp.dto';
import * as bcrypt from 'bcrypt';
import { WalletRepository } from 'src/wallet/repository/wallet.repository';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private walletRepo: WalletRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDTO) {
    const user = await this.userRepo.findOneBy({ email: signInDto.email });

    if (user && (await bcrypt.compare(signInDto.password, user.password))) {
      const token = this.jwtService.sign({
        email: signInDto.email,
        userId: user.id,
      });
      return {
        ...user,
        token,
      };
    } else {
      throw new UnauthorizedException('check your details properly');
    }
  }

  async signUp(signUpDto: SignUpDTO) {
    const user = await this.userRepo.createUser(signUpDto);
    const token = this.jwtService.sign({ email: signUpDto.email });

    //start
    const userData = await this.userRepo.findOneBy({
      email: signUpDto.email,
    });
    const ad = new UserEntity(userData);
    await this.walletRepo.createWallet(ad);

    //end
    return {
      ...user,
      token,
    };
  }
}
