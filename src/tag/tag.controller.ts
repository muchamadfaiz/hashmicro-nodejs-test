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

@ApiTags('tags')
@Controller({ path: 'tags', version: '1' })
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(@Query() query: TagFilterDto) {
    const result = await this.tagService.findAll(query);
    return {
      data: result,
      meta: {},
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result = await this.tagService.findOne(id);
    return {
      data: result,
      meta: {},
    };
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    const result = await this.tagService.create(createTagDto);
    return {
      data: result,
      meta: {},
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTagDto: CreateTagDto) {
    const result = await this.tagService.update(id, updateTagDto);
    return {
      data: result,
      meta: {},
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.tagService.delete(id);
    return {
      data: result,
      meta: {},
    };
  }
}
