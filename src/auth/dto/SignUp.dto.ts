import { IsEmail, Length } from 'class-validator';

export class SignUpDTO {
  @IsEmail()
  email: string;

  @Length(8, 40)
  password: string;
}
