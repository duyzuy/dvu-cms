import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from './category.dto';

export class CreateCategoryDto extends CategoryDto {
  // @IsNotEmpty()
  createdAt: Date;
}

export class UpdateCategoryDto extends CategoryDto {
  @IsNotEmpty()
  slug: string;

  // @IsNotEmpty()
  updatedAt: Date;
}
