import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  title: string;
}
