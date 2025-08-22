import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/tag-create.dto';
import { PaginationProvider } from '@/common/pagination/pagination.provider';
import { TagFilterDto } from './dto/tag-filter.dto';
import { createFilter } from './helper/tag.helper';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async findAll(query: TagFilterDto) {
    const where = createFilter(query);

    return await this.paginationProvider.paginateQuery(
      query,
      this.tagRepository,
      where,
    );
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async create(payload: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(payload);
    await this.tagRepository.save(tag);
    return tag;
  }

  async update(id: number, payload: CreateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) throw new NotFoundException('Tag not found');
    this.tagRepository.merge(tag, payload);
    return this.tagRepository.save(tag);
  }

  async delete(id: number): Promise<Tag> {
    const tag = await this.findOne(id);
    return this.tagRepository.remove(tag);
  }
}
