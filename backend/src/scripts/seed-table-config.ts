import { DataSource } from 'typeorm';
import { TableConfig } from '../entities/table-config.entity';
import { databaseConfig } from '../config/database.config';
import * as fs from 'fs';
import * as path from 'path';

async function seedTableConfig() {
  console.log('🌱 Starting TableConfig seeding...');

  // Create datasource
  const dataSource = new DataSource({
    ...databaseConfig,
    entities: [TableConfig],
  } as any);

  try {
    // Initialize connection
    await dataSource.initialize();
    console.log('✅ Database connection established');

    // Read JSON file
    const dataPath = path.join(__dirname, '../../data/table-config.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const configs = JSON.parse(jsonData);

    console.log(`📦 Found ${configs.length} table configs to seed`);

    const configRepository = dataSource.getRepository(TableConfig);

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const configData of configs) {
      // Check if config already exists
      const existingConfig = await configRepository.findOne({
        where: {
          tableName: configData.tableName,
          columnKey: configData.columnKey,
        },
      });

      if (existingConfig) {
        // Update existing config
        Object.assign(existingConfig, configData);
        await configRepository.save(existingConfig);
        console.log(
          `🔄 Updated ${configData.tableName}.${configData.columnKey}`,
        );
        updated++;
      } else {
        // Create new config
        const config = configRepository.create(configData);
        await configRepository.save(config);
        console.log(
          `✅ Inserted ${configData.tableName}.${configData.columnKey}`,
        );
        inserted++;
      }
    }

    console.log('\n📊 Seeding Summary:');
    console.log(`   ✅ Inserted: ${inserted}`);
    console.log(`   🔄 Updated: ${updated}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📦 Total: ${configs.length}`);
    console.log('\n🎉 TableConfig seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding table config:', error);
    throw error;
  } finally {
    // Close connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('👋 Database connection closed');
    }
  }
}

// Run seeding
seedTableConfig()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

