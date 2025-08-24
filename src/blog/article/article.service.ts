import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Article } from './article.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from '@/common/pagination/pagination.provider';
import { createFilter } from './helper/article.helper';
import { ArticleFilterDto } from './dto/article-filter.dto';
import { CreateArticleDto } from './dto/article-create.dto';
import { UpdateArticleDto } from './dto/article-update.dto';
import { UserService } from '@/admin/user/user.service';
import { Tag } from '../tag/tag.entity';
import { User } from '@/admin/user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    private readonly paginationProvider: PaginationProvider,
    private readonly userService: UserService,
  ) {}

  async findAll(dto: ArticleFilterDto) {
    const where = createFilter(dto);

    return await this.paginationProvider.paginateQuery(
      dto,
      this.articleRepo,
      where,
    );
  }

  async findOne(id: number) {
    const article = await this.articleRepo.findOne({
      where: { id },
      relations: { author: true, tags: true },
    });
    if (!article) throw new NotFoundException('Article is not found');
    return article;
  }

  async createOne(createArticleDto: CreateArticleDto, user: User) {
    const { authorId, tagIds, publishedAt, ...rest } = createArticleDto;

    if (user.role.name !== 'admin' && authorId && authorId !== user.id) {
      throw new ForbiddenException(
        'You cannot create an article for another author.',
      );
    }

    const finalAuthorId = user.role.name === 'admin' ? authorId : user.id;

    const base: Partial<Article> = {
      ...rest,
      publishedAt: createArticleDto.isPublished
        ? publishedAt
          ? new Date(publishedAt)
          : new Date()
        : null,
    };

    const relation: Partial<Article> = await this.processArticleRelations({
      authorId: finalAuthorId,
      tagIds,
    });

    const final: Partial<Article> = {
      ...base,
      ...relation,
    };

    const article = this.articleRepo.create(final);
    return await this.articleRepo.save(article);
  }

  async updateOne(id: number, dto: UpdateArticleDto, user: User) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article is not found');

    const { authorId, tagIds, publishedAt, isPublished, ...rest } = dto;

    if (user.role.name !== 'admin' && authorId && authorId !== user.id) {
      throw new ForbiddenException(
        'You cannot change the author to another user.',
      );
    }

    const finalAuthorId = user.role.name === 'admin' ? authorId : user.id;

    const base: Partial<Article> = {
      ...rest,
    };

    if (isPublished !== undefined) {
      base.isPublished = isPublished;
      base.publishedAt = isPublished
        ? publishedAt
          ? new Date(publishedAt)
          : new Date()
        : null;
    }

    const relation = await this.processArticleRelations({
      authorId: finalAuthorId,
      tagIds,
    });

    const final: Partial<Article> = {
      ...base,
      ...relation,
    };

    this.articleRepo.merge(article, final);
    return await this.articleRepo.save(article);
  }

  async deleteOne(id: number, user: User) {
    const article = await this.findOne(id);

    if (user.role.name !== 'admin' && article.author.id !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this article.',
      );
    }

    return this.articleRepo.remove(article);
  }

  private async processArticleRelations(dto: {
    authorId?: number;
    tagIds?: number[];
  }) {
    const relation: Partial<Article> = {};

    if (dto.authorId !== undefined) {
      const author = await this.userService.findOne(dto.authorId);
      if (!author) throw new BadRequestException('Author is not found');
      relation.author = author;
    }

    if (dto.tagIds !== undefined) {
      const tags = await this.tagRepo.find({ where: { id: In(dto.tagIds) } });
      if (tags.length !== dto.tagIds.length) {
        const foundIds = tags.map((t) => t.id);
        const missing = dto.tagIds.filter((id) => !foundIds.includes(id));
        throw new BadRequestException(
          `Tag(s) are not found: [${missing.join(', ')}]`,
        );
      }
      relation.tags = tags;
    }

    return relation;
  }
}
