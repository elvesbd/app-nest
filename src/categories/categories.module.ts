import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controllers';
import { Category } from './infra/entities';
import { CategoriesService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
