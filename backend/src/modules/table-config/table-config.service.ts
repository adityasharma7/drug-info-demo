import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableConfig } from '../../entities/table-config.entity';

@Injectable()
export class TableConfigService {
  constructor(
    @InjectRepository(TableConfig)
    private tableConfigRepository: Repository<TableConfig>,
  ) {}

  async findAll(): Promise<TableConfig[]> {
    return await this.tableConfigRepository.find({
      order: { tableName: 'ASC', order: 'ASC' },
    });
  }

  async findByTable(tableName: string): Promise<TableConfig[]> {
    return await this.tableConfigRepository.find({
      where: { tableName },
      order: { order: 'ASC' },
    });
  }

}

