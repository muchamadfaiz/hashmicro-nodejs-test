import { User } from '@/admin/user/user.entity';
import { Analyzer } from '@/analyzer/analyzer.entity';
import { Article } from '@/blog/article/article.entity';
import { Tag } from '@/blog/tag/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,

    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,

    @InjectRepository(Analyzer)
    private readonly analyzerRepo: Repository<Analyzer>,
  ) {}
  async getDashboard() {
    const userCount = await this.userRepo.count();
    const articleCount = await this.articleRepo.count();
    const tagCount = await this.tagRepo.count();
    const analyzerCount = await this.analyzerRepo.count();

    console.log({ userCount, articleCount, tagCount, analyzerCount });
    return {
      userCount,
      articleCount,
      tagCount,
      analyzerCount,
    };
  }
}
