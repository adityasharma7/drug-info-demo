import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrugModule } from './modules/drug/drug.module';
import { TableConfigModule } from './modules/table-config/table-config.module';
import { databaseConfig } from './config/database.config';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    DrugModule,
    TableConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}