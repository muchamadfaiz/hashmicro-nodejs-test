import { FindOptionsWhere, ILike } from 'typeorm';
import { Article } from '../article.entity';
import { ArticleFilterDto } from '../dto/article-filter.dto';

export function createFilter(
  query: ArticleFilterDto,
): FindOptionsWhere<Article> {
  const { title } = query;
  const where: FindOptionsWhere<Article> = {};
  if (title) {
    where.title = ILike(`%${query.title}%`);
  }

  return where;
}
