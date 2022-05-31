import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const ReqUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
