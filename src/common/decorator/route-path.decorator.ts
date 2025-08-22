import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RoutePath = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const routePath = req.originalUrl.split('?')[0].split('/')[3];
    return routePath;
  },
);
