import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableConfig } from '../../entities/table-config.entity';
import { TableConfigService } from './table-config.service';
import { TableConfigController } from './table-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TableConfig])],
  controllers: [TableConfigController],
  providers: [TableConfigService],
  exports: [TableConfigService],
})
export class TableConfigModule {}

