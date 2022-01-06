import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  author: number;
}
