import { IsOptional, IsString, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class FindDrugsQueryDto {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsIn(['launchDate', 'createdAt', 'code', 'genericName', 'brandName'])
  sortBy?: 'launchDate' | 'createdAt' | 'code' | 'genericName' | 'brandName';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

