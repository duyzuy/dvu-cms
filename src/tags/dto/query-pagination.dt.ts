import { IsNotEmpty, IsNumber } from 'class-validator';
import { Unique } from 'src/utils/UniqueValidation';
import { Tag } from '../entities/tag.entity';

export class QueryPagination {
  @IsNumber()
  perPage: number;
  @IsNumber()
  page: number;
}
