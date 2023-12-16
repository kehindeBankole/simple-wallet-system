import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
