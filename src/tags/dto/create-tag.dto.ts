import { IsNotEmpty } from 'class-validator';
import { Unique } from 'src/utils/UniqueValidation';
import { Tag } from '../entities/tag.entity';

export class BaseTagDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Unique(Tag)
  slug: string;
}
export class CreateTagDto extends BaseTagDto {
  // @IsNotEmpty()
  createdAt: Date;
}

export class UpdateTagDto extends BaseTagDto {
  // @IsNotEmpty()
  updatedAt: Date;
}
