import { IsEmail, Length } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  email: string;

  @Length(8, 40)
  password: string;
}
