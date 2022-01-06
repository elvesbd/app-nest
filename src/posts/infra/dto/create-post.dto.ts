import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  title: string;
}
