import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { TableConfigService } from './table-config.service';

@Controller('table-config')
export class TableConfigController {
  constructor(private readonly tableConfigService: TableConfigService) {}

  @Get()
  findAll() {
    return this.tableConfigService.findAll();
  }

  @Get('table/:tableName')
  findByTable(@Param('tableName') tableName: string) {
    return this.tableConfigService.findByTable(tableName);
  }
}

