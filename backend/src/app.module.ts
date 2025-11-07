import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrugModule } from './modules/drug/drug.module';
import { TableConfigModule } from './modules/table-config/table-config.module';
import { databaseConfig } from './config/database.config';
import { SeedService } from './seed.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 300000, // 5 minutes in milliseconds
      max: 100, // maximum number of items in cache
    }),
    TypeOrmModule.forRoot(databaseConfig),
    DrugModule,
    TableConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}