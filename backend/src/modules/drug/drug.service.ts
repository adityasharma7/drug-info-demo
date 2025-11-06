import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsOrder, FindOptionsWhere, Like } from 'typeorm';
import { Drug } from '../../entities/drug.entity';
import { FindDrugsQueryDto } from '../../dto/find-drugs-query.dto';
import { PaginatedResponseDto } from '../../dto/paginated-response.dto';

@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug)
    private drugRepository: Repository<Drug>,
  ) {}

  async find(queryDto: FindDrugsQueryDto): Promise<PaginatedResponseDto<Drug>> {
    const {
      company,
      sortBy = 'launchDate',
      order = 'DESC',
      page = 1,
      limit = 10,
    } = queryDto;

    // Build where clause
    const where: FindOptionsWhere<Drug> = {};
    if (company) {
      where.company = company;
    }

    // Build order clause
    const orderOption: FindOptionsOrder<Drug> = {};
    orderOption[sortBy] = order;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [data, total] = await this.drugRepository.findAndCount({
      where,
      order: orderOption,
      skip,
      take: limit,
    });

    // Calculate metadata
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}

