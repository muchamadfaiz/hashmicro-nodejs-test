import { FindOptionsWhere, ILike } from 'typeorm';
import { UserFilterDto } from '../dto/user-filter.dto';
import { User } from '../user.entity';

export function createFilter(query: UserFilterDto): FindOptionsWhere<User> {
  const { username } = query;
  const where: FindOptionsWhere<User> = {};
  if (username) {
    where.username = ILike(`%${query.username}%`);
  }

  return where;
}
