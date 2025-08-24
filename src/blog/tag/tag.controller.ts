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
import { TagService } from './tag.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/tag-create.dto';
import { TagFilterDto } from './dto/tag-filter.dto';
import { RoutePath } from '@/common/decorator/route-path.decorator';
import {
  CreateOneTagDecorators,
  DeleteTagDecorators,
  GetAllTagDecorators,
  GetOneTagDecorators,
  UpdateOneTagDecorators,
} from './decorator/tag.decorator';

@ApiTags('Tag')
@Controller({ path: 'tags', version: '1' })
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @GetAllTagDecorators()
  async findAll(@Query() query: TagFilterDto, @RoutePath() routePath: string) {
    const result = await this.tagService.findAll(query);
    return {
      status: true,
      message: `success return all ${routePath}`,
      ...result,
    };
  }

  @Get(':id')
  @GetOneTagDecorators()
  async findOne(@Param('id') id: number, @RoutePath() routePath: string) {
    const result = await this.tagService.findOne(id);
    return {
      status: true,
      message: `success return one ${routePath}`,
      ...result,
    };
  }

  @Post()
  @CreateOneTagDecorators()
  async create(
    @Body() createTagDto: CreateTagDto,
    @RoutePath() routePath: string,
  ) {
    await this.tagService.create(createTagDto);
    return {
      status: true,
      message: `success create one tag ${routePath}`,
    };
  }

  @Patch(':id')
  @UpdateOneTagDecorators()
  async update(
    @Param('id') id: number,
    @Body() updateTagDto: CreateTagDto,
    @RoutePath() routePath: string,
  ) {
    await this.tagService.update(id, updateTagDto);
    return {
      status: true,
      message: `success update one ${routePath}`,
    };
  }

  @Delete(':id')
  @DeleteTagDecorators()
  async delete(@Param('id') id: number, @RoutePath() routePath: string) {
    await this.tagService.delete(id);
    return {
      status: true,
      message: `success delete one ${routePath}`,
    };
  }
}
