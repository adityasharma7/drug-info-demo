import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Drug } from './entities/drug.entity';
import { TableConfig } from './entities/table-config.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    if (process.env.AUTO_SEED !== 'true') {
      this.logger.log('Auto-seeding is disabled');
      return;
    }

    this.logger.log('🌱 Starting automatic database seeding...');

    try {
      await this.seedDrugs();
      await this.seedTableConfig();
      this.logger.log('✅ Auto-seeding completed successfully!');
    } catch (error) {
      this.logger.error('❌ Auto-seeding failed:', error);
    }
  }

  private async seedDrugs() {
    const drugRepository = this.dataSource.getRepository(Drug);
    const existing = await drugRepository.count();

    if (existing > 0) {
      this.logger.log(`⏭️  Drugs already exist (${existing} found), skipping...`);
      return;
    }

    const dataPath = path.join(__dirname, '../data/drugs.json');
    const drugs = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    let inserted = 0;
    for (const drugData of drugs) {
      const drug = drugRepository.create(drugData);
      await drugRepository.save(drug);
      inserted++;
    }

    this.logger.log(`✅ Inserted ${inserted} drugs`);
  }

  private async seedTableConfig() {
    const configRepository = this.dataSource.getRepository(TableConfig);
    const existing = await configRepository.count();

    if (existing > 0) {
      this.logger.log(`⏭️  Table configs already exist (${existing} found), skipping...`);
      return;
    }

    const dataPath = path.join(__dirname, '../data/table-configs.json');
    const configs = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    let inserted = 0;
    for (const configData of configs) {
      const config = configRepository.create(configData);
      await configRepository.save(config);
      inserted++;
    }

    this.logger.log(`✅ Inserted ${inserted} table configs`);
  }
}

