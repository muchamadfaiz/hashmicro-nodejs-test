import { FindOptionsWhere, ILike } from 'typeorm';
import { TagFilterDto } from '../dto/tag-filter.dto';
import { Tag } from '../tag.entity';

export function createFilter(query: TagFilterDto): FindOptionsWhere<Tag> {
  const { name } = query;
  const where: FindOptionsWhere<Tag> = {};
  if (name) {
    where.name = ILike(`%${query.name}%`);
  }

  return where;
}
