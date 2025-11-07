import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TableConfig } from '../../entities/table-config.entity';

@Injectable()
export class TableConfigService {
  constructor(
    @InjectRepository(TableConfig)
    private tableConfigRepository: Repository<TableConfig>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<TableConfig[]> {
    const cacheKey = 'table-configs:all';
    
    // Try to get from cache
    const cached = await this.cacheManager.get<TableConfig[]>(cacheKey);
    if (cached) {
      return cached;
    }

    // If not in cache, fetch from database
    const configs = await this.tableConfigRepository.find({
      order: { tableName: 'ASC', order: 'ASC' },
    });

    // Store in cache
    await this.cacheManager.set(cacheKey, configs);
    
    return configs;
  }

  async findByTable(tableName: string): Promise<TableConfig[]> {
    const cacheKey = `table-configs:${tableName}`;
    
    // Try to get from cache
    const cached = await this.cacheManager.get<TableConfig[]>(cacheKey);
    if (cached) {
      return cached;
    }

    // If not in cache, fetch from database
    const configs = await this.tableConfigRepository.find({
      where: { tableName },
      order: { order: 'ASC' },
    });

    // Store in cache
    await this.cacheManager.set(cacheKey, configs);
    
    return configs;
  }

}

