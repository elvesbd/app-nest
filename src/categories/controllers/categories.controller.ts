import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/auth/guards';
import { CreateCategoryDto, UpdateCategoryDto } from '../infra/dto';
import { CategoriesService } from '../services';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(id: string) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createCategory(category: CreateCategoryDto) {
    console.log(category);
    return this.categoriesService.createCategory(category);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(Number(id), category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(Number(id));
  }
}
