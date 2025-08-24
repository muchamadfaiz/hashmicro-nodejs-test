import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
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
    ApiBearerAuth(),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create one Tag' }),
    ApiOkResponse({ description: 'Success get one Tag' }),
  );
}

export function UpdateOneTagDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Update one Tag' }),
    ApiOkResponse({ description: 'Success update one Tag' }),
  );
}

export function DeleteTagDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Delete one Tag' }),
    ApiOkResponse({ description: 'Success delete one Tag with no return' }),
  );
}
