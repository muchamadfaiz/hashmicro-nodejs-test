import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(user, user.role.id);

    if (!user || !user.role.id) {
      throw new ForbiddenException('Access Denied, user role is undefined.');
    }

    return true;
  }
}
