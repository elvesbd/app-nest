import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryNotFoundException } from '../exceptions';
import { CreateCategoryDto } from '../infra/dto';
import { Category } from '../infra/entities';
import { ICategory } from '../infra/interfaces';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getAllCategories(): Promise<ICategory[]> {
    return this.categoryRepository.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number): Promise<ICategory> {
    // const category = await this.categoryRepository.findOne(id);
    const category = await this.categoryRepository.findOne(id, {
      relations: ['posts'],
      withDeleted: true,
    });
    if (!category) {
      throw new CategoryNotFoundException(id);
    }
    return category;
  }

  async restoreDeletedCategory(id: number) {
    const restoreResponse = await this.categoryRepository.restore(id);
    if (!restoreResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }

  async createCategory(category: CreateCategoryDto): Promise<ICategory> {
    const newCategory = this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(
    id: number,
    category: CreateCategoryDto,
  ): Promise<ICategory> {
    await this.categoryRepository.update(id, category);
    const updatedCategory = await this.categoryRepository.findOne(id, {
      relations: ['posts'],
    });
    if (!updatedCategory) {
      throw new CategoryNotFoundException(id);
    }
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<void> {
    const deleteResponse = await this.categoryRepository.softDelete(id);

    if (!deleteResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }

  async deleteCategoryById(id: number): Promise<void> {
    return this.deleteCategory(id);
  }
}
