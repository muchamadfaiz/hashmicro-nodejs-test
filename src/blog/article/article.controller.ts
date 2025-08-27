import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleFilterDto } from './dto/article-filter.dto';
import { RoutePath } from '@/common/decorator/route-path.decorator';
import {
  CreateOneArticleDecorators,
  DeleteArticleDecorators,
  GetAllArticleDecorators,
  GetOneArticleDecorators,
  UpdateOneArticleDecorators,
} from './decorator/article.decorator';
import { CreateArticleDto } from './dto/article-create.dto';
import { UpdateArticleDto } from './dto/article-update.dto';
import { GetUser } from '@/admin/auth/decorator/get-user.decorator';
import { User } from '@/admin/user/user.entity';

@ApiTags('Article')
@Controller({ path: 'articles', version: '1' })
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  @GetAllArticleDecorators()
  async findAll(
    @Query() query: ArticleFilterDto,
    @RoutePath() routePath: string,
  ) {
    const result = await this.articleService.findAll(query);
    return {
      status: true,
      message: `success return all ${routePath}`,
      ...result,
    };
  }

  @Get(':id')
  @GetOneArticleDecorators()
  async findOne(@Param('id') id: number) {
    return await this.articleService.findOne(id);
  }

  @Post()
  @CreateOneArticleDecorators()
  async create(@Body() body: CreateArticleDto, @GetUser() user: User) {
    return await this.articleService.createOne(body, user);
  }

  @Patch(':id')
  @UpdateOneArticleDecorators()
  async update(
    @Param('id') id: number,
    @Body() body: CreateArticleDto,
    @GetUser() user: User,
  ) {
    return await this.articleService.updateOne(id, body, user);
  }

  @Delete(':id')
  @DeleteArticleDecorators()
  async delete(@Param('id') id: number, @GetUser() user: User) {
    return await this.articleService.deleteOne(id, user);
  }
}
