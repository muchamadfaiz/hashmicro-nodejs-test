import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    console.log('📌 Required roles from @Roles():', requiredRoles);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('🙋‍♂️ User from JWT:', user);

    if (!user || !user.role.id) {
      throw new ForbiddenException('Access Denied, user role is undefined.');
    }

    const userRole = user.role.name.toLowerCase();
    const matched = requiredRoles.some(
      (role) => role.toLowerCase() === userRole,
    );

    if (!matched) {
      throw new ForbiddenException(
        `Access Denied: required role(s) [${requiredRoles.join(
          ', ',
        )}], but got [${userRole}]`,
      );
    }

    return true;
  }
}
