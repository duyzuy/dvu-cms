import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { CategoryStatus } from 'src/utils/types';
import { Unique } from 'src/utils/UniqueValidation';
import { Category } from '../entities/category.entity';

export class CategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Unique(Category)
  slug: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @Matches(
    `^${Object.values(CategoryStatus)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  status: CategoryStatus;
}
