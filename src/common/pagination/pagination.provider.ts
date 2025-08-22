import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { IPagination } from './pagination.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaginationProvider {
  constructor(private configService: ConfigService) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
  ): Promise<IPagination<T>> {
    const { page, limit } = paginationQueryDto;
    const URL = this.configService.get('BACKEND_DOMAIN');
    const PORT = this.configService.get('APP_PORT');
    const baseUrl = `${URL}:${PORT}/api/v1/${repository.metadata.name.toLowerCase() + 's'}`;

    const findOptions: FindManyOptions<T> = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (where) {
      findOptions.where = where;
    }

    const result = await repository.find(findOptions);

    const totalData = await repository.count({ where });

    const totalPages = Math.ceil(totalData / limit);

    const firstLink =
      result.length > 0 ? `${baseUrl}?page=1&limit=${limit}` : null;

    const lastLink =
      result.length > 0 ? `${baseUrl}?page=${totalPages}&limit=${limit}` : null;

    const nextLink =
      page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;

    const prevLink =
      page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;

    const response: IPagination<T> = {
      data: result,
      meta: {
        page: {
          itemPerPage: limit,
          currentPage: page,
          totalPages: totalPages,
          totalData: totalData,
        },
      },
      links: {
        first: firstLink,
        next: nextLink,
        prev: prevLink,
        last: lastLink,
      },
    };

    return response;
  }
}
