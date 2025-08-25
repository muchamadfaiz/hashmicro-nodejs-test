import { Roles } from '@/admin/auth/decorator/roles.decorator';
import { UserRole } from '@/admin/auth/enum/role.enum';
import { JwtAuthGuard } from '@/admin/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@/admin/auth/guard/roles.guard';
import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function GetAllArticleDecorators() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all data Article' }),
    ApiOkResponse({ description: 'Success get all data Article' }),
  );
}

export function GetOneArticleDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get one Article' }),
    ApiOkResponse({ description: 'Success get one Article' }),
    ApiNotFoundResponse({ description: 'Article Not Found' }),
  );
}

export function CreateOneArticleDecorators() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(UserRole.ADMIN, UserRole.AUTHOR),
    ApiBearerAuth(),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create one Article' }),
    ApiOkResponse({ description: 'Success get one Article' }),
  );
}

export function UpdateOneArticleDecorators() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(UserRole.ADMIN, UserRole.AUTHOR),
    ApiBearerAuth(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Update one Article' }),
    ApiOkResponse({ description: 'Success update one Article' }),
  );
}

export function DeleteArticleDecorators() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles(UserRole.ADMIN, UserRole.AUTHOR),
    ApiBearerAuth(),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Delete one Article' }),
    ApiOkResponse({ description: 'Success delete one Article with no return' }),
  );
}
