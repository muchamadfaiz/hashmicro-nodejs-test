import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function GetAllTagDecorators() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all data Tag' }),
    ApiOkResponse({ description: 'Success get all data Tag' }),
  );
}

export function GetOneTagDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get one Tag' }),
    ApiOkResponse({ description: 'Success get one Tag' }),
    ApiNotFoundResponse({ description: 'Tag Not Found' }),
  );
}

export function CreateOneTagDecorators() {
  return applyDecorators(
    // @Roles(UserRole.ADMIN),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create one Tag' }),
    ApiOkResponse({ description: 'Success get one Tag' }),
  );
}

export function UpdateOneTagDecorators() {
  return applyDecorators(
    // Roles(UserRole.ADMIN),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Update one Tag' }),
    ApiOkResponse({ description: 'Success update one Tag' }),
  );
}

export function DeleteTagDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Delete one Tag' }),
    ApiOkResponse({ description: 'Success delete one Tag with no return' }),
  );
}

export function DeleteManyTagDecorators() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Delete many data Tag' }),
    ApiOkResponse({
      description: 'Success delete many data Tag with no return',
    }),
  );
}
