import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
