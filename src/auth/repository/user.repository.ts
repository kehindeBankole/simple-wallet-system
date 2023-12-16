import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { SignUpDTO } from '../dto/SignUp.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(createUserDto: SignUpDTO) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.findOneBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException('User already exist');
    } else {
      const newUser = this.create(createUserDto);

      try {
        await this.save({
          ...newUser,
          password,
        });
        return newUser;
      } catch (error) {
        throw new BadRequestException('Something bad happened', {
          cause: new Error(error),
          description: 'Some error description',
        });
      }
    }
  }
}
