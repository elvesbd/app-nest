import { IsOptional, IsString } from 'class-validator';
import { Category } from 'src/categories/infra/entities';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  title: string;

  category: string;
}
