import { DataSource } from 'typeorm';
import { Drug } from '../entities/drug.entity';
import { databaseConfig } from '../config/database.config';
import * as fs from 'fs';
import * as path from 'path';

async function seedDrugs() {
  console.log('🌱 Starting Drug seeding...');

  // Create datasource
  const dataSource = new DataSource({
    ...databaseConfig,
    entities: [Drug],
  } as any);

  try {
    // Initialize connection
    await dataSource.initialize();
    console.log('✅ Database connection established');

    // Read JSON file
    const dataPath = path.join(__dirname, '../../data/drugs.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const drugs = JSON.parse(jsonData);

    console.log(`📦 Found ${drugs.length} drugs to seed`);

    const drugRepository = dataSource.getRepository(Drug);

    let inserted = 0;
    let skipped = 0;

    for (const drugData of drugs) {
      // Check if drug with same code already exists
      const existingDrug = await drugRepository.findOne({
        where: { code: drugData.code },
      });

      if (existingDrug) {
        console.log(`⏭️  Skipping ${drugData.code} - already exists`);
        skipped++;
        continue;
      }

      // Create and save drug
      const drug = drugRepository.create(drugData);
      await drugRepository.save(drug);
      console.log(`✅ Inserted ${drugData.code} - ${drugData.brandName}`);
      inserted++;
    }

    console.log('\n📊 Seeding Summary:');
    console.log(`   ✅ Inserted: ${inserted}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📦 Total: ${drugs.length}`);
    console.log('\n🎉 Drug seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding drugs:', error);
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
seedDrugs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

