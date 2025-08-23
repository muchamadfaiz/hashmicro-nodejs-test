import { Roles } from '@/admin/auth/decorator/roles.decorator';
import { UserRole } from '@/admin/auth/enum/role.enum';
import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function GetAllUserDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get all data User' }),
    ApiOkResponse({ description: 'Success get all data User' }),
  );
}

export function GetOneUserDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get one User' }),
    ApiOkResponse({ description: 'Success get one User' }),
    ApiNotFoundResponse({ description: 'User Not Found' }),
  );
}

export function CreateOneUserDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    Roles(UserRole.ADMIN),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create one User' }),
    ApiOkResponse({ description: 'Success get one User' }),
  );
}

export function UpdateOneUserDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    Roles(UserRole.ADMIN),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Update one User' }),
    ApiOkResponse({ description: 'Success update one User' }),
  );
}

export function DeleteUserDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Delete one User' }),
    ApiOkResponse({ description: 'Success delete one User with no return' }),
  );
}
