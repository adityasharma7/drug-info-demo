import { DataSource } from 'typeorm';
import { Drug } from '../entities/drug.entity';
import { TableConfig } from '../entities/table-config.entity';
import { databaseConfig } from '../config/database.config';
import * as fs from 'fs';
import * as path from 'path';

async function seedAll() {
  console.log('🌱 Starting complete database seeding...\n');

  // Create datasource
  const dataSource = new DataSource({
    ...databaseConfig,
    entities: [Drug, TableConfig],
  } as any);

  try {
    // Initialize connection
    await dataSource.initialize();
    console.log('✅ Database connection established\n');

    // ===== SEED DRUGS =====
    console.log('📦 Seeding Drugs...');
    const drugsPath = path.join(__dirname, '../../data/drugs.json');
    const drugsData = JSON.parse(fs.readFileSync(drugsPath, 'utf-8'));
    const drugRepository = dataSource.getRepository(Drug);

    let drugsInserted = 0;
    let drugsSkipped = 0;

    for (const drugData of drugsData) {
      const existingDrug = await drugRepository.findOne({
        where: { code: drugData.code },
      });

      if (existingDrug) {
        drugsSkipped++;
        continue;
      }

      const drug = drugRepository.create(drugData);
      await drugRepository.save(drug);
      console.log(`   ✅ ${drugData.code} - ${drugData.brandName}`);
      drugsInserted++;
    }

    console.log(`\n   Summary: ${drugsInserted} inserted, ${drugsSkipped} skipped\n`);

    // ===== SEED TABLE CONFIG =====
    console.log('⚙️  Seeding TableConfig...');
    const configPath = path.join(__dirname, '../../data/table-config.json');
    const configsData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const configRepository = dataSource.getRepository(TableConfig);

    let configsInserted = 0;
    let configsUpdated = 0;

    for (const configData of configsData) {
      const existingConfig = await configRepository.findOne({
        where: {
          tableName: configData.tableName,
          columnKey: configData.columnKey,
        },
      });

      if (existingConfig) {
        Object.assign(existingConfig, configData);
        await configRepository.save(existingConfig);
        console.log(`   🔄 ${configData.tableName}.${configData.columnKey}`);
        configsUpdated++;
      } else {
        const config = configRepository.create(configData);
        await configRepository.save(config);
        console.log(`   ✅ ${configData.tableName}.${configData.columnKey}`);
        configsInserted++;
      }
    }

    console.log(`\n   Summary: ${configsInserted} inserted, ${configsUpdated} updated\n`);

    // ===== FINAL SUMMARY =====
    console.log('═══════════════════════════════════════');
    console.log('📊 Complete Seeding Summary:');
    console.log('═══════════════════════════════════════');
    console.log(`Drugs:        ${drugsInserted} inserted, ${drugsSkipped} skipped`);
    console.log(`TableConfig:  ${configsInserted} inserted, ${configsUpdated} updated`);
    console.log('═══════════════════════════════════════');
    console.log('🎉 All seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    throw error;
  } finally {
    // Close connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('\n👋 Database connection closed');
    }
  }
}

// Run seeding
seedAll()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

