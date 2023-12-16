import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/SignIn.dto';
import { SignUpDTO } from './dto/SignUp.dto';
import { UserEntity } from './entity/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async login(@Body() payload: SignInDTO) {
    const data = await this.authService.signIn(payload);
    return new UserEntity(data);
  }

  @Post('signup')
  async signUp(@Body() payload: SignUpDTO) {
    const data = await this.authService.signUp(payload);

    return new UserEntity(data);
  }
}
